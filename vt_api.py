import requests
import json
import os
from datetime import datetime
from time import sleep
import queue
import threading

results_path = 'results/'
date_format = '%Y%m%d%H%M%S'

def get_report_hash(api_key, resource='7657fcb7d772448a6d8504e4b20168b8'):
    json_response = {}
    error_str = ''
    params = {'apikey': api_key, 'resource': resource}
    headers = {
      "Accept-Encoding": "gzip, deflate",
      "User-Agent" : "gzip,  Check hash public API client/siniysv"
      }
    try:
        response = requests.get('https://www.virustotal.com/vtapi/v2/file/report',
          params=params, headers=headers)
        if response.status_code == 200:
            json_response = response.json()
        elif response.status_code == 403:
            error_str = 'Unauthorized - API key issue'
    except Exception as e:
        error_str = str(e)

    return json_response, error_str

def get_task(task_id):
    filename = results_path + 'task_' + task_id
    task = {}
    error = ''
    # check if task already done
    exists = os.path.isfile(filename)
    if exists:
        try:
            with open(filename, 'r') as task_file:
                task_str = task_file.readline()
                task = json.loads(task_str)
        except Exception as e:
            error = str(e)
    else:
        error = 'Cannot find task %s' %filename

    return task, error

def get_task_results(task_id):
    filename = results_path + 'task_' + task_id
    task_results = []
    error = ''
    exists = os.path.isfile(filename)
    if exists:
        try:
            with open(filename, 'r') as task_file:
                task_str = task_file.readline()
                task = json.loads(task_str)
        except Exception as e:
            error = str(e)
        if not error:
            task_properties = ['datetime', 'id', 'num_completed', 'num_resources']
            for key, value in task.items():
                if key not in task_properties:
                    task_results.append(key)
    else:
        error = 'Cannot find task %s' %filename

    return task_results, error

def get_tasks():
    tasks = []
    error = ''
    try:
        for filename in os.listdir(results_path):
            if filename.startswith("task_"):
                tasks.append(filename.split('_')[1])
    except Exception as e:
        error = str(e)

    return tasks, error

def add_task(task_id, resources):
    # current_time = datetime.utcnow().strftime(date_format)
    current_time = datetime.utcnow().isoformat()
    filename = results_path + 'task_' + task_id
    task = {}
    error = ''
    # check if task already done
    exists = os.path.isfile(filename)
    if exists:
        error = 'Task already exists, try run again'
    else:
        resources = resources.splitlines()
        for resource in resources:
            task[resource] = {'checked': 'not checked'}
        task['datetime'] = current_time
        task['id'] = task_id
        task['num_resources'] = len(resources)
        task['num_completed'] = 0
        try:
            with open(filename, 'w') as task_file:
                task_str = json.dumps(task)
                task_file.write(task_str)
        except Exception as e:
            error = str(e)
    return filename, error

def update_task(task_id, task_dict):
    current_time = datetime.utcnow().isoformat()
    filename = results_path + 'task_' + task_id
    error = ''
    try:
        with open(filename, 'w') as task_file:
            task_str = json.dumps(task_dict)
            task_file.write(task_str)
    except Exception as e:
        error = str(e)

    return filename, error


def remove_task(task_id):
    filename = results_path + 'task_' + task_id
    error = ''
    # check if task already done
    exists = os.path.isfile(filename)
    if exists:
        try:
            os.remove(filename)
        except Exception as e:
            error = str(e)
    else:
        error = 'Cannot find task %s' %filename
    return filename, error

def remove_task_results(task_id, with_task=False):
    filename = results_path + 'task_' + task_id
    errors = []
    # check if task already done
    exists = os.path.isfile(filename)
    if exists:
        try:
            task, error = get_task(task_id)
            if not error:
                task_properties = ['datetime', 'id', 'num_completed', 'num_resources']
                for key, value in task.items():
                    if key not in task_properties:
                        result_file, error_file = remove_result(key)
                        if error_file:
                            errors.append(error_file)
            else:
                errors.append(error)
        except Exception as e:
            errors.append(str(e))
        if with_task:
            try:
                os.remove(filename)
            except Exception as e:
                errors.append(str(e))
    else:
        errors.append('Cannot find task %s' %filename)

    return filename, errors

def run_task(api_key, task_id, mode='repeat', delay=16):
    filename = results_path + 'task_' + task_id
    errors = []
    if mode == 'repeat':
        num_completed = 0
        # get task results
        task_results, task_results_error = get_task_results(task_id)
        # get result list
        results, results_error = get_results()

        if task_results_error:
            errors.append(task_results_error)
        elif results_error:
            errors.append(results_error)
        else:
            for task_result in task_results:
                if task_result not in results:
                    resource = task_result
                    json_response, error_str = get_report_hash(api_key, resource)
                    if not error_str:
                        result_filename, result_error = add_result(resource, json_response)
                        if result_error:
                            errors.append(result_error)
                        else:
                            task[task_result] = 'checked'
                            num_completed += 1
                    else:
                        errors.append(error_str)
                    sleep(delay)
                else:
                    num_completed += 1

    elif mode == 'new':
        num_completed = 0
        # get task
        task, task_error = get_task(task_id)
        if task_error:
            errors.append(task_error)
        else:
            # get task results
            task_results, task_results_error = get_task_results(task_id)
            if task_results_error:
                errors.append(task_results_error)
            else:
                for task_result in task_results:
                    resource = task_result
                    json_response, error_str = get_report_hash(api_key, resource)
                    if not error_str:
                        result_filename, result_error = add_result(resource, json_response)
                        if result_error:
                            errors.append(result_error)
                            task[task_result] = 'error'
                        else:
                            task[task_result] = 'checked'
                            num_completed += 1
                    else:
                        errors.append(error_str)
                        task[task_result] = 'error'
                    sleep(delay)
                task['num_completed'] = num_completed
                update_filename, update_error = update_task(task_id, task)
                if update_error:
                    errors.append(update_error)
    else:
        errors.append('Incorrect run mode %s' %mode)

    return filename, errors

def add_result(resource, json_response):
    filename = results_path + 'result_' + resource
    error = ''
    try:
        with open(filename, 'w') as result_file:
            result_str = json.dumps(json_response)
            result_file.write(result_str)
    except Exception as e:
        error = str(e)
    return filename, error

def remove_result(resource):
    filename = results_path + 'result_' + resource
    error = ''
    exists = os.path.isfile(filename)
    if exists:
        try:
            os.remove(filename)
        except Exception as e:
            error = str(e)
    else:
        error = 'Cannot find result %s' %filename
    return filename, error

def get_result(resource):
    filename = results_path + 'result_' + resource
    json_response = {}
    error = ''
    # check if exists
    exists = os.path.isfile(filename)
    if exists:
        try:
            with open(filename, 'r') as result_file:
                result_str = result_file.readline()
                json_response = json.loads(result_str)
        except Exception as e:
            error = str(e)
    else:
        error = 'Cannot find file %s for resource %s' %(filename, resource)
    return json_response, error


def get_results():
    results = []
    error = ''
    try:
        for filename in os.listdir(results_path):
            if filename.startswith("result_"):
                tasks.append(filename.split('_')[1])
    except Exception as e:
        error = str(e)

    return results, error


def check_task_status(task_id):
    pass


class VTReportByHash(threading.Thread):
    def __init__(self, api_key, task_id, status_queue, base_path='results/', mode='new', delay=16):
        super().__init__()
        self.api_key = api_key
        self.task_id = task_id
        self.status_queue = status_queue
        self.base_path = base_path
        self.mode = mode
        self.delay = delay

        self.cancelled = False
        self.start_time = None

        self.result = None

        self.checked = 0
        self.pending = 0
        self.all = 0

        self.last_error = None

    def run(self):
        start_time = datetime.utcnow()
        print('Thread %s starting at %s' %(self.task_id, start_time.isoformat()))
        filename = results_path + 'task_' + self.task_id
        errors = []
        if self.mode == 'new':
            num_completed = 0
            # get task
            task, task_error = self.get_task(self.task_id)
            if task_error:
                errors.append(task_error)
                self.last_error = task_error
            else:
                # set stats
                self.all = task['num_resources']
                self.checked = task['num_completed']
                self.pending = self.all - self.checked

                # get task results
                task_results, task_results_error = self.get_task_results(self.task_id)
                if task_results_error:
                    errors.append(task_results_error)
                    self.last_error = task_results_error
                else:
                    for task_result in task_results:
                        resource = task_result
                        json_response, error_str = self.get_report_hash(self.api_key, resource)
                        if not error_str:
                            result_filename, result_error = self.add_result(resource, json_response)
                            if result_error:
                                errors.append(result_error)
                                self.last_error = result_error
                                task[task_result] = 'error'
                            else:
                                task[task_result] = 'checked'
                                num_completed += 1
                                self.checked += 1
                                self.pending = self.all - self.checked
                        else:
                            errors.append(error_str)
                            self.last_error = error_str
                            task[task_result] = 'error'
                        # TODO PUT TO QUEUE
                        self.to_queue(task_result, task[task_result])
                        if self.cancelled:
                            task['num_completed'] = num_completed
                            update_filename, update_error = self.update_task(self.task_id, task)
                            if update_error:
                                self.last_error = update_error
                                errors.append(update_error)
                            break
                        sleep(self.delay)
                    task['num_completed'] = num_completed
                    update_filename, update_error = self.update_task(self.task_id, task)
                    if update_error:
                        errors.append(update_error)
                        self.last_error = update_error
        else:
            errors.append('Incorrect run mode %s' %mode)

        end_time = datetime.utcnow()
        duration = end_time - start_time
        self.result = (filename, errors)
        print('Thread %s stopping at %s' %(self.task_id, start_time.isoformat()))
        return filename, errors

    def to_queue(self, result_id, result_status):
        event_dict = {'task_id': self.task_id, 'result_id': result_id, 'result_status': result_status}
        self.status_queue.put(event_dict)

    def get_task(self, task_id):
        filename = results_path + 'task_' + task_id
        task = {}
        error = ''
        # check if task exists
        exists = os.path.isfile(filename)
        if exists:
            try:
                with open(filename, 'r') as task_file:
                    task_str = task_file.readline()
                    task = json.loads(task_str)
            except Exception as e:
                error = str(e)
        else:
            error = 'Cannot find task %s' %filename

        return task, error

    def get_task_results(self, task_id):
        filename = results_path + 'task_' + task_id
        task_results = []
        error = ''
        exists = os.path.isfile(filename)
        if exists:
            try:
                with open(filename, 'r') as task_file:
                    task_str = task_file.readline()
                    task = json.loads(task_str)
            except Exception as e:
                error = str(e)
            if not error:
                task_properties = ['datetime', 'id', 'num_completed', 'num_resources']
                for key, value in task.items():
                    if key not in task_properties:
                        task_results.append(key)
        else:
            error = 'Cannot find task %s' %filename

        return task_results, error

    def get_report_hash(self, api_key, resource='7657fcb7d772448a6d8504e4b20168b8'):
        json_response = {}
        error_str = ''
        params = {'apikey': api_key, 'resource': resource}
        headers = {
          "Accept-Encoding": "gzip, deflate",
          "User-Agent" : "gzip,  Check hash public API client/siniysv"
          }
        try:
            response = requests.get('https://www.virustotal.com/vtapi/v2/file/report',
              params=params, headers=headers)
            if response.status_code == 200:
                json_response = response.json()
            elif response.status_code == 403:
                error_str = 'Unauthorized - API key issue'
        except Exception as e:
            error_str = str(e)

        return json_response, error_str

    def add_result(self, resource, json_response):
        filename = results_path + 'result_' + resource
        error = ''
        try:
            with open(filename, 'w') as result_file:
                result_str = json.dumps(json_response)
                result_file.write(result_str)
        except Exception as e:
            error = str(e)
        return filename, error

    def update_task(self, task_id, task_dict):
        current_time = datetime.utcnow().isoformat()
        filename = results_path + 'task_' + task_id
        error = ''
        try:
            with open(filename, 'w') as task_file:
                task_str = json.dumps(task_dict)
                task_file.write(task_str)
        except Exception as e:
            error = str(e)
        return filename, error

    def join(self):
        threading.Thread.join(self)
        return self.result

    def stop(self):
        self.cancelled = True

if __name__ == '__main__':
    pass
