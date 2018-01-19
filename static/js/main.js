$(document).ready(function() {
  // var dummy_task = {
  //   "datetime": "2018-01-12T19:00:08.381616",
  //   "7657fcb7d772448a6d8504e4b20168b8": "checked",
  //   "id": "11111112222222",
  //   "num_resources": 1,
  //   "num_completed": 1
  // };
  //
  // var dummy_task_list = [dummy_task];

  var dummy_result = {"scans": {"Bkav": {"detected": true, "version": "1.3.0.9466", "result": "W32.ZeustrackerZS.Trojan", "update": "20180112"}, "MicroWorld-eScan": {"detected": true, "version": "14.0.297.0", "result": "Gen:Variant.Kazy.8782", "update": "20180112"}, "nProtect": {"detected": true, "version": "2018-01-12.03", "result": "Trojan-Spy/W32.ZBot.109056.AR", "update": "20180112"}, "CMC": {"detected": true, "version": "1.1.0.977", "result": "Trojan.Win32.Lebag!O", "update": "20180111"}, "CAT-QuickHeal": {"detected": true, "version": "14.00", "result": "Trojan.Ramnit.A", "update": "20180112"}, "McAfee": {"detected": true, "version": "6.0.6.653", "result": "PWS-Zbot.gen.cy", "update": "20180112"}, "Malwarebytes": {"detected": true, "version": "2.1.1.1115", "result": "Spyware.Zbot", "update": "20180112"}, "Zillya": {"detected": true, "version": "2.0.0.3466", "result": "Trojan.Zbot.Win32.81569", "update": "20180112"}, "SUPERAntiSpyware": {"detected": true, "version": "5.6.0.1032", "result": "Trojan.Agent/Gen-FakeSecurity", "update": "20180112"}, "TheHacker": {"detected": true, "version": "6.8.0.5.2304", "result": "Trojan/Lebag.agu", "update": "20180112"}, "K7GW": {"detected": true, "version": "10.37.25870", "result": "Riskware ( 0015e4f11 )", "update": "20180112"}, "K7AntiVirus": {"detected": true, "version": "10.37.25874", "result": "Riskware ( 0015e4f11 )", "update": "20180112"}, "Invincea": {"detected": true, "version": "6.3.1.25473", "result": "heuristic", "update": "20170914"}, "Baidu": {"detected": true, "version": "1.0.0.2", "result": "Win32.Worm.Autorun.f", "update": "20180112"}, "F-Prot": {"detected": true, "version": "4.7.1.166", "result": "W32/Ramnit.K.gen!Eldorado", "update": "20180112"}, "Symantec": {"detected": true, "version": "1.5.0.0", "result": "W32.Ramnit", "update": "20180112"}, "TotalDefense": {"detected": true, "version": "37.1.62.1", "result": "Win32/Ramnit.B!Dropper", "update": "20180112"}, "TrendMicro-HouseCall": {"detected": true, "version": "9.950.0.1006", "result": "TSPY_ZBOT.SMHA", "update": "20180112"}, "Avast": {"detected": true, "version": "17.9.3761.0", "result": "Win32:Kryptik-JOV [Trj]", "update": "20180112"}, "ClamAV": {"detected": true, "version": "0.99.2.0", "result": "Win.Trojan.Ramnit-7847", "update": "20180112"}, "Kaspersky": {"detected": true, "version": "15.0.1.13", "result": "Worm.Win32.Autorun.icp", "update": "20180112"}, "BitDefender": {"detected": true, "version": "7.2", "result": "Gen:Variant.Kazy.8782", "update": "20180112"}, "NANO-Antivirus": {"detected": true, "version": "1.0.100.20834", "result": "Trojan.Win32.DownLoad2.csmmu", "update": "20180112"}, "Paloalto": {"detected": true, "version": "1.0", "result": "generic.ml", "update": "20180112"}, "AegisLab": {"detected": true, "version": "4.2", "result": "Troj.W32.Generic!c", "update": "20180112"}, "Tencent": {"detected": true, "version": "1.0.0.1", "result": "Worm.Win32.AutoRun.aaa", "update": "20180112"}, "Ad-Aware": {"detected": true, "version": "3.0.3.1010", "result": "Gen:Variant.Kazy.8782", "update": "20180112"}, "Sophos": {"detected": true, "version": "4.98.0", "result": "Troj/ZXC-G", "update": "20180112"}, "Comodo": {"detected": true, "version": "28337", "result": "TrojWare.Win32.Kryptik.KLV", "update": "20180112"}, "F-Secure": {"detected": true, "version": "11.0.19100.45", "result": "Gen:Variant.Kazy.8782", "update": "20180112"}, "DrWeb": {"detected": true, "version": "7.0.28.2020", "result": "Win32.HLLW.Tazebama.235", "update": "20180112"}, "VIPRE": {"detected": true, "version": "63830", "result": "Trojan.Win32.Generic!BT", "update": "20180112"}, "TrendMicro": {"detected": true, "version": "9.862.0.1074", "result": "TSPY_ZBOT.SMHA", "update": "20180112"}, "McAfee-GW-Edition": {"detected": true, "version": "v2015", "result": "BehavesLike.Win32.PWSZbot.ch", "update": "20180112"}, "Emsisoft": {"detected": true, "version": "4.0.2.899", "result": "Gen:Variant.Kazy.8782 (B)", "update": "20180112"}, "SentinelOne": {"detected": true, "version": "1.0.11.201", "result": "static engine - malicious", "update": "20171224"}, "Cyren": {"detected": true, "version": "5.4.30.7", "result": "W32/Ramnit.K.gen!Eldorado", "update": "20180112"}, "Jiangmin": {"detected": true, "version": "16.0.100", "result": "Trojan/Generic.dkmt", "update": "20180112"}, "Webroot": {"detected": true, "version": "1.0.0.207", "result": "Trojan:Win32/Eyestye.H", "update": "20180112"}, "Avira": {"detected": true, "version": "8.3.3.6", "result": "TR/Drop.Liks.A", "update": "20180112"}, "Fortinet": {"detected": true, "version": "5.4.247.0", "result": "W32/Kryptik.KLV!tr", "update": "20180112"}, "Antiy-AVL": {"detected": true, "version": "3.0.0.1", "result": "Worm/Win32.Autorun.icp", "update": "20180112"}, "Kingsoft": {"detected": false, "version": "2013.8.14.323", "result": null, "update": "20180112"}, "Endgame": {"detected": true, "version": "1.1.4", "result": "malicious (high confidence)", "update": "20171130"}, "Arcabit": {"detected": true, "version": "1.0.0.827", "result": "Trojan.Kazy.D224E", "update": "20180112"}, "ViRobot": {"detected": true, "version": "2014.3.20.0", "result": "Trojan.Win32.Agent.109056.CR", "update": "20180112"}, "ZoneAlarm": {"detected": true, "version": "1.0", "result": "Worm.Win32.Autorun.icp", "update": "20180112"}, "Avast-Mobile": {"detected": false, "version": "180112-00", "result": null, "update": "20180112"}, "Microsoft": {"detected": true, "version": "1.1.14405.2", "result": "Trojan:Win32/Ramnit", "update": "20180112"}, "AhnLab-V3": {"detected": true, "version": "3.11.3.19504", "result": "Trojan/Win32.Zbot.R19508", "update": "20180112"}, "ALYac": {"detected": true, "version": "1.1.1.3", "result": "Gen:Variant.Kazy.8782", "update": "20180112"}, "AVware": {"detected": true, "version": "1.5.0.42", "result": "Trojan.Win32.Generic!BT", "update": "20180103"}, "MAX": {"detected": true, "version": "2017.11.15.1", "result": "malware (ai score=100)", "update": "20180112"}, "VBA32": {"detected": true, "version": "3.12.28.0", "result": "Worm.AutoRun", "update": "20180112"}, "Cylance": {"detected": true, "version": "2.3.1.101", "result": "Unsafe", "update": "20180112"}, "WhiteArmor": {"detected": false, "version": null, "result": null, "update": "20180110"}, "Zoner": {"detected": true, "version": "1.0", "result": "Win32.Ramnit.A", "update": "20180112"}, "ESET-NOD32": {"detected": true, "version": "16725", "result": "Win32/Ramnit.A", "update": "20180112"}, "Rising": {"detected": true, "version": "25.0.0.1", "result": "Malware.XPACK!1.64E1 (CLASSIC)", "update": "20180112"}, "Yandex": {"detected": true, "version": "5.5.1.3", "result": "Trojan.Ramnit!cLbJ7UZPdfE", "update": "20180112"}, "Ikarus": {"detected": true, "version": "0.1.5.2", "result": "Virus.Win32.Virtob", "update": "20180112"}, "eGambit": {"detected": false, "version": "v4.2.7", "result": null, "update": "20180112"}, "GData": {"detected": true, "version": "A:25.15648B:25.11336", "result": "Gen:Variant.Kazy.8782", "update": "20180112"}, "AVG": {"detected": true, "version": "17.9.3761.0", "result": "Win32:Kryptik-JOV [Trj]", "update": "20180112"}, "Cybereason": {"detected": true, "version": "0.0.914", "result": "malicious.1b8fb7", "update": "20171103"}, "Panda": {"detected": true, "version": "4.6.4.2", "result": "Trj/Ramnit.F", "update": "20180112"}, "CrowdStrike": {"detected": true, "version": "1.0", "result": "malicious_confidence_100% (W)", "update": "20171016"}, "Qihoo-360": {"detected": true, "version": "1.0.0.1120", "result": "Win32/Trojan.544", "update": "20180112"}}, "scan_id": "54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71-1515771253", "sha1": "84c7201f7e59cb416280fd69a2e7f2e349ec8242", "resource": "7657fcb7d772448a6d8504e4b20168b8", "response_code": 1, "scan_date": "2018-01-12 15:34:13", "permalink": "https://www.virustotal.com/file/54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71/analysis/1515771253/", "verbose_msg": "Scan finished, information embedded", "total": 68, "positives": 64, "sha256": "54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71", "md5": "7657fcb7d772448a6d8504e4b20168b8"}

  // console.log("Starting!");
  $("#submit_form").on('click', function(){
  	submitTask();
  });

  $("#full_report").on('click', function(){
    var url = decodeURI(window.location.hash);
    var task_id = url.split('#task/')[1].trim();

    request_full_report(task_id);
  });

  $(window).on('hashchange', function(){
      // On every hash change the render function is called with the new hash.
      // This is how the navigation of our app happens.
      render(decodeURI(window.location.hash));
  });
  if (window.location.hash==''){
    window.location.hash="#tasks"; // home page, show the default view (user list)
    render(decodeURI(window.location.hash));
  } else {
    $(window).trigger( "hashchange" ); // user refreshed the browser, fire the appropriate function
  }






  function render(url) {
    // console.log("Rendering! "+url);
    var temp = url.split('/')[0];
    // $(".w3-container").removeClass("w3-show");
    // console.log(temp);
    var map = {
      '#tasks': function() {
        // render task list
        $(".w3-container").addClass("w3-hide");
        $("#task_list").removeClass("w3-hide");
        $("#nav_bar").removeClass("w3-hide");

        request_task_list();
      },
      '#newtask': function() {
        // render new task form
        $(".w3-container").addClass("w3-hide");
        $("#new_task").removeClass("w3-hide");
        $("#nav_bar").removeClass("w3-hide");
      },
      '#task': function() {
        $(".w3-container").addClass("w3-hide");
        $("#task_details").removeClass("w3-hide");
        $("#nav_bar").removeClass("w3-hide");
        $("#task_bar").removeClass("w3-hide");

        var task_id = url.split('#task/')[1].trim();
        request_task(task_id);
        request_task_results(task_id);
      },
	  '#entry': function() {
        $(".w3-container").addClass("w3-hide");
        $("#entry_details").removeClass("w3-hide");
        $("#nav_bar").removeClass("w3-hide");
        // $("#task_bar").removeClass("w3-hide");

        var entry_id = url.split('/')[1].trim();
        var task_id = url.split('/')[2].trim();
        request_task(task_id);
        request_result(task_id, entry_id);
      },
    '#taskremove': function() {
        var task_id = url.split('#taskremove/')[1].trim();
        request_task_remove(task_id);
        render('#tasks');

      },
    '#taskcancel': function() {
        var task_id = url.split('#taskcancel/')[1].trim();
        request_task_cancel(task_id);
        render('#tasks');
      }
    };
    if(map[temp]){
      map[temp]();
    }
    else {
      renderErrorPage();
    }
  };

  function renderTaskList(task_list) {
    var rows = generateTaskListHTML(task_list);
    $(".task_table").empty();
    // add header
    var header = "<tr><th>Task ID</th><th>Added</th><th>Added by</th><th>Hashes checked</th><th>Remove</th></tr>"
    $(".task_table").append(header)
    // add rows
    rows.forEach(function(row){
      $(".task_table").append(row);
    });
  }

  function renderTask(task) {
    var task_row = generateTaskRowHTML(task);
    $(".task_table").empty();
    // add header
    var header = "<tr><th>Task ID</th><th>Added</th><th>Added by</th><th>Hashes checked</th><th>Remove</th></tr>";
    $(".task_table").append(header);
    $(".task_table").append(task_row);
  }

  function renderEntryList(entry_list) {
    var rows = generateEntryListHTML(entry_list);
    $(".entries_table").empty();
    var header = "<tr><th>Resource</th><th>Hashes</th><th>Rate</th><th>Scan Date</th><th>Recheck</th><th>VT Link</th></tr>"
    $(".entries_table").append(header);
    rows.forEach(function(row){
      $(".entries_table").append(row);
    });
  }

  function renderResult(task_id, entry) {
    $(".entries_table").empty();
    var header = "<tr><th>Resource</th><th>Hashes</th><th>Rate</th><th>Scan Date</th><th>Recheck</th><th>VT Link</th></tr>"
    $(".entries_table").append(header);
    var entry_row = generateEntryRowHTML(task_id, entry);
    $(".entries_table").append(entry_row);
  }

  function renderEngineList(entry) {
    $("#engine_details_table").empty();
    var header = "<th>***</th><th>AV Engine</th><th>AV Version</th><th>Updated</th><th>Malware</th>"
    $("#engine_details_table").append(header);
    var rows = generateEngineListHTML(entry);
    rows.forEach(function(row){
      $("#engine_details_table").append(row);
    });
  }

  function generateTaskListHTML(data) {
    // console.log(data);
    var data_sorted = data.reverse(compareTaskDate);
    // return table rows
    var rows = [];
    data_sorted.forEach(function(task) {
      rows.push(generateTaskRowHTML(task));
    });
    return rows;
  };

  function compareTaskDate(a,b) {
    if (Date(a.datetime) < Date(b.datetime))
      return -1;
    if (Date(a.datetime) > Date(b.datetime))
      return 1;
    return 0;
  }

  function generateTaskRowHTML(data) {
    var task_id = data["id"];
    // var datetime = Date(data["datetime"]);
    var datetime = data["datetime"];
    var num_resources = data["num_resources"];
    var num_completed = data["num_completed"];
    var user = "system";

    if (data.hasOwnProperty("is_running")) {
      var single_row = $("<tr class='w3-green'></tr>");
      var remove_cell_a = "<a href=\"#taskcancel/"+task_id + "\">Cancel</a>";
      var remove_cell = document.createElement("td");
      remove_cell.innerHTML = remove_cell_a;
      // console.log(remove_cell);
      var stats = data["stats"];
      var hashes_checked_cell = document.createElement("td");
      hashes_checked_cell.innerHTML = stats["checked"]+'/'+stats["all"];
      // console.log(hashes_checked_cell);
    } else {
      var single_row = $("<tr></tr>");
      var remove_cell_a = "<a href=\"#taskremove/"+task_id + "\">Remove</a>";
    	var remove_cell = document.createElement("td");
      remove_cell.innerHTML = remove_cell_a;
      // console.log(remove_cell);
      var hashes_checked_cell = document.createElement("td");
      hashes_checked_cell.innerHTML = num_completed+'/'+num_resources;
      // console.log(hashes_checked_cell);
    };
  	var task_id_a = "<a href=\"#task/"+task_id + "\">" + task_id + "</a>";
    var task_id_cell = document.createElement("td");
    task_id_cell.innerHTML = task_id_a;
    // console.log(task_id_cell);

    var dt_cell = document.createElement("td");
    dt_cell.innerHTML = datetime;
    // console.log(dt_cell);

    var user_cell = document.createElement("td");
    user_cell.innerHTML = user;
    // console.log(user_cell);




    single_row.append(task_id_cell, dt_cell, user_cell, hashes_checked_cell, remove_cell);
    // console.log("Single row: " + single_row);
    return single_row;
  }

  function generateEntryListHTML(entry_list) {
    var task_id = entry_list["id"];
    var entries = entry_list["response"];
  	var rows = [];
    for (var i = 0; i < entries.length; i++) {
      var row = generateEntryRowHTML(task_id, entries[i]);
      rows.push(row);
    }
    return rows;
  };


  function generateEntryRowHTML(task_id, entry) {
    var entry_id = entry["resource"];
    var hash_types = ["md5", "sha1", "sha256"];
	  var hashes = entry["md5"] + "\n" + entry["sha1"] + "\n" + entry["sha256"];
    var rate = entry["positives"] + "/" + entry["total"];
    var scan_date = entry["scan_date"];
    var rechek = "Link to recheck";
    var vtlink = entry["permalink"];

    var single_row = document.createElement("tr");

	  var entry_id_a = "<a href=\"#entry/"+entry_id + "/" + task_id + "\">" + entry_id + "</a>";
    var entry_id_cell = document.createElement("td");
    entry_id_cell.innerHTML = entry_id_a;

    var hash_types_cell = document.createElement("td");
    hash_types_cell.innerHTML = hash_types;

    var rate_cell = document.createElement("td");
    rate_cell.innerHTML = rate;

    var scan_date_cell = document.createElement("td");
    scan_date_cell.innerHTML = scan_date;

    var rechek_cell = document.createElement("td");
    rechek_cell.innerHTML = rechek;

    var vtlink_cell_a = "<a href=\"" + vtlink + "\">Link to VT</a>";
  	var vtlink_cell = document.createElement("td");
    vtlink_cell.innerHTML = vtlink_cell_a;

    single_row.append(entry_id_cell, hash_types_cell, rate_cell, scan_date_cell, rechek_cell, vtlink_cell);
    // console.log("Single row: " + single_row);
    return single_row;
  }

  // {"detected": true, "version": "1.0.0.2", "result": "Win32.Worm.Autorun.f", "update": "20180112"}

  function generateEngineListHTML(entry) {
    var scans = entry["scans"];
    var rows = [];
    for (var property in scans) {
      if (scans.hasOwnProperty(property)) {
        // console.log(property);
        var row = generateEngineRowHTML(property, scans[property]);
        rows.push(row);
      }
    }
    return rows;
  }

  function generateEngineRowHTML(engine, data) {
    // console.log(engine);
    var detected = data["detected"];
    var version = data["version"];
    var update = data["update"];
    var malware = data["result"];
    var single_row = document.createElement("tr");

    var detected_cell = document.createElement("td");
    detected_cell.innerHTML = detected;

    var engine_cell = document.createElement("td");
    engine_cell.innerHTML = engine;

    var version_cell = document.createElement("td");
    version_cell.innerHTML = version;

    var update_cell = document.createElement("td");
    update_cell.innerHTML = update;

    var malware_cell = document.createElement("td");
    malware_cell.innerHTML = malware;

    single_row.append(detected_cell, engine_cell, version_cell, update_cell, malware_cell);
    // console.log(single_row);
    return single_row;

  }

  function renderErrorPage(){
    $.notify("Requested page not found", "error");
    render('#tasks');
    // console.log("Requested page not found");
  };

  function createQueryHash(task_id){
    // Here we check if filters isn't empty.
    if(!$.isEmptyObject(task_id)){
      // Stringify the object via JSON.stringify and write it after the '#filter' keyword.
      window.location.hash = '#task/' + JSON.stringify(task_id);
    }
    else{
      // If it's empty change the hash to '#' (the homepage).
      window.location.hash = '#';
    }
  };

  function getTaskList(){
    var task_list = request_tasks();
    // return dummy_task_list;
    return task_list;
  }

  function getTask(task_id){
  	return dummy_task;
  }

  function getResult(res_id){
    // console.log(dummy_result)
  	return dummy_result;
  }

  function submitTask() {
	var api_key = $("input[name=api_key_input]").val();
	var hashes = $("#hashes").val();
	// validate API key
	if (api_key.length < 4) {
	  console.log("Short key");
    $.notify("Short key", "error");
	  return false;
	}
	// validate hashes
	if (hashes.length < 2) {
	  console.log("Short hash");
    $.notify("Short hash", "error");
	  return false;
	}
	// send request
	var data = {"api_key":api_key, "hashes":hashes};
	// console.log(JSON.stringify(data));

  $.ajax({
    url: '/post',
     data: {'api_key': api_key, 'hashes': hashes},
     type: 'POST',
     success: function(response) {
       $.notify(response, "info");
       // console.log(response);
     },
     error: function(error) {
       $.notify(error, "error");
       // console.log(error);
     }
   });

  $.notify("Data: " + data, "info");
  render('#tasks');
	return true;
  }

  function request_task_list() {
    $.get('/tasks', function(data, status) {
      process_task_list(data, status);
    })
  }

  function process_task_list(data, status) {
    renderTaskList(data);
  }

  function request_task(task_id) {
    var uri = '/task' + task_id;
    $.get(uri, function(data, status) {
      process_task(data, status);
    });
  }

  function process_task(data, status) {
    renderTask(data);
    // renderEntryList(data);
  }

  function request_task_results(task_id) {
    var uri = '/taskresults' + task_id;
    $.get(uri, function(data, status) {
      process_task_results(data, status);
    });
  }

  function process_task_results(data, status) {
    renderEntryList(data);
  }

  function request_result(task_id, entry_id) {
    // console.log(entry_id);
    var uri = '/result' + entry_id;
    $.get(uri, function(data, status) {
      process_result(task_id, data, status);
    });
  }

  function process_result(task_id, data, status) {
    renderResult(task_id, data);
    renderEngineList(data);
  }

  function request_task_remove(task_id) {
    // console.log(entry_id);
    var uri = '/taskremove' + task_id;
    $.get(uri, function(data, status) {
      process_task_remove(data, status);
    });
  }

  function process_task_remove(data, status) {
    console.log(data);
  }

  function request_task_cancel(task_id) {
    // console.log(entry_id);
    var uri = '/taskcancel' + task_id;
    $.get(uri, function(data, status) {
      process_task_cancel(data, status);
    });
  }

  function process_task_cancel(data, status) {
    console.log(data);
  }

  function request_full_report(task_id) {
    // console.log(entry_id);
    var uri = '/fullreport' + task_id;
    $.get(uri, function(data, status) {
      process_full_report(data, status);
    });
  }

  function process_full_report(data, status) {
    var task = data["task"];
    var rows_dict = data["rows"];
    var columns = data["columns"];
    var report = "";
    // add header to report
    report += "# " + task["id"] + ", " + task["datetime"] + "\n";

    var header = "resource,";
    for (var i = 0; i < columns.length; i++) {
      header += columns[i] + ",";
    }

    report += header + "\n";

    // console.log(columns);

    // add rows

    for (var entry in rows_dict) {
      if (rows_dict.hasOwnProperty(entry)) {
        var engines = rows_dict[entry];
        var row = entry + ",";
        for (var i = 0; i < columns.length; i++) {
          row += engines[columns[i]] + ",";
        }
        report += row + "\n";
      }
    };
    var blob = new Blob([report], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "report_" + task["id"] +".csv");
    // console.log(report);
  }

});
