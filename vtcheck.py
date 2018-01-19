from flask import Flask

app = Flask(__name__)

import queue
import uuid
import threading

from flask import render_template, redirect, url_for, jsonify, request

from vt_api import get_task, get_tasks, add_task, get_task_results
from vt_api import get_result, remove_task, remove_task_results
from vt_api import VTReportByHash

status_queue = queue.Queue()

running_threads = 0
running_threads_max = 1
running_tasks = []

def test_key(request):
    api_key = request.form['api_key']
    response, error = get_report_hash(api_key)
    if error:
        return False
    else:
        return True

def get_running_threads():
    all_threads = threading.enumerate()
    all_tasks_running = []
    for thread in all_threads:
        try:
            all_tasks_running.append(thread.task_id)
        except:
            pass
    return all_tasks_running

def thread_by_id(task_id):
    all_threads = threading.enumerate()
    for thread in all_threads:
        try:
            if thread.task_id == task_id:
                return thread
        except:
            pass
    return None

def get_thread_stats(thread):
    stats = {'all': thread.all, 'checked': thread.checked, 'pending': thread.pending}
    return stats

def process_data(request):
    global running_threads
    global running_tasks
    running_task_ids = get_running_threads()
    running_threads_num = len(running_task_ids)
    error = ''
    api_key = request.form['api_key']
    resources = request.form['hashes']
    resources_list = resources.splitlines()

    task_id = uuid.uuid4().hex

    response = {}

    existing_tasks, existing_tasks_error = get_tasks()

    if existing_tasks_error:
        error = existing_tasks_error
    else:
        is_duplicated = False
        for existing_task_id in existing_tasks:
            existing_task_dict, existing_task_dict_error = get_task(existing_task_id)
            if existing_task_dict_error:
                error = existing_task_dict_error
            else:
                existing_task_results = []
                task_properties = ['datetime', 'id', 'num_completed', 'num_resources']
                for key, value in existing_task_dict.items():
                    if key not in task_properties:
                        existing_task_results.append(key)

                if existing_task_results == resources_list:
                    error = 'Cannot add task with the same resources'
                    is_duplicated = True

        if not is_duplicated:
            # print('Adding task', task_id)
            filename_task, filename_task_error = add_task(task_id, resources)
            if filename_task_error:
                error = filename_task_error
            else:
                if running_threads_num < running_threads_max:
                    thread = VTReportByHash(api_key, task_id, status_queue)
                    thread.start()
                    running_threads +=1
                    running_tasks.append(task_id)
                else:
                    error = 'Cannot run new thread, maximum %s reached (current %s)' %(
                        str(running_threads_max),
                        str(running_threads_num))
    response['task_id'] = task_id
    response['error'] = error
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return redirect(url_for('static', filename='favicon.ico'), code=302)

@app.route('/post', methods = ['POST'])
def get_post_data():
    response = process_data(request)
    return jsonify(response)

@app.route('/task<string:task_id>', methods = ['GET'])
def task(task_id):
    running_task_ids = get_running_threads()
    task, error = get_task(task_id)
    response = task
    # TODO Add running task handling
    return jsonify(response)

@app.route('/taskresults<string:task_id>', methods = ['GET'])
def taskresults(task_id):
    response = []
    result_list, error = get_task_results(task_id);
    for result_id in result_list:
        result, error = get_result(result_id)
        response.append(result)
    response = {'id': task_id, 'response': response, 'error': error}
    return jsonify(response)

@app.route('/taskcancel<string:task_id>', methods = ['GET'])
def taskcancel(task_id):
    response, error = get_task(task_id)
    all_tasks_running = get_running_threads()
    if task_id in all_tasks_running:
        try:
            thread = thread_by_id(task_id)
            thread.stop()
        except:
            print('Cannot stop thread')
    else:
        print('Task %s not found' %task_id)
    return jsonify(response)

@app.route('/taskremove<string:task_id>', methods = ['GET'])
def taskremove(task_id):
    response, error = remove_task_results(task_id, with_task=True)
    return jsonify(response)

@app.route('/result<string:entry_id>', methods = ['GET'])
def result(entry_id):
    result, error = get_result(entry_id)
    response = result
    # TODO Add running task handling
    return jsonify(response)

@app.route('/tasks_running', methods = ['GET'])
def tasks_running():
    all_tasks_running = get_running_threads()
    print(all_tasks_running)
    return jsonify(all_tasks_running)

@app.route('/tasks', methods = ['GET'])
def tasks():
    all_tasks = []
    all_tasks_running = get_running_threads()
    tasks, error = get_tasks()
    if error:
        # all_tasks['error'] = error
        all_tasks = []
    else:
        for task_id in tasks:
            task_dict, task_error = get_task(task_id)
            if task_error:
                # all_tasks[task_id] = {'error': error}
                all_tasks = []
            else:
                if task_dict['id'] in all_tasks_running:
                    task_dict['is_running'] = True
                    task_dict['stats'] = get_thread_stats(thread_by_id(task_dict['id']))
                all_tasks.append(task_dict)
    return jsonify(all_tasks)

@app.route('/fullreport<string:task_id>', methods = ['GET'])
def fullreport(task_id):
    task_dict, error = get_task(task_id)
    result_list, error = get_task_results(task_id)
    scan_list = set()
    rows_dict = {}
    for result_id in result_list:
        result, error = get_result(result_id)
        try:
            for scan in result['scans'].keys():
                scan_list.add(scan)
        except KeyError:
            pass
    for result_id in result_list:
        result, error = get_result(result_id)
        row_dict = {}
        for scan in scan_list:
            try:
                scan_result = result["scans"][scan]['result']
                if not result["scans"][scan]['detected']:
                    scan_result = 'not_detected'
                row_dict[scan] = scan_result
            except KeyError:
                row_dict[scan] = 'not_scanned'
        rows_dict[result_id] = row_dict
    scan_list = sorted(list(scan_list))
    response = {'task': task_dict, 'rows': rows_dict, 'columns': scan_list}
    return jsonify(response)


if __name__ == '__main__':
    app.run()
