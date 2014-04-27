"use strict";
var miczImapQuota = {

  //Default Thunderbird options
  defaultThresholdShow: 75,
  defaultThresholdWarning: 80,
  defaultThresholdCritical: 95,

	init: function(){
        let firstRunPref = "extensions.miczImapQuota.firstRun";

        if (!Application.prefs.getValue(firstRunPref, false)) {
            Application.prefs.setValue(firstRunPref, true);
            Application.prefs.setValue("mail.quota.mainwindow_threshold.show",0);
        }

        /*TODO*/
        //Implement prefs to default when disabled or uninstalled!
	},



};

window.addEventListener("load", miczImapQuota.init, false);
