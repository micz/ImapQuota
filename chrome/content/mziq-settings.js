"use strict";
var miczImapQuotaPref = {

  update_show_check: function(){
    document.getElementById("ImapQuota.Show_checkbox").checked=(document.getElementById("ImapQuota.ThresholdShow_textfield").value==0);
  },

  update_show_value: function(){
    let prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch(miczImapQuota.baseBranch);
    if(document.getElementById("ImapQuota.Show_checkbox").checked){
      document.getElementById("ImapQuota.ThresholdShow_textfield").value=0;
      prefs.setIntPref("show",0);
    }else{
      document.getElementById("ImapQuota.ThresholdShow_textfield").value=miczImapQuota.defaultThresholdShow;
      prefs.setIntPref("show",miczImapQuota.defaultThresholdShow);
    }
  },
  
  set_default_values: function(){
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
    let t_msg="Are you sure?";
    let p_msg_c="Do you want to set alle the values to the default ones?";
    if(!promptService.confirm(null,t_msg,p_msg_c))return;
    
    let prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch(miczImapQuota.baseBranch);
    document.getElementById("ImapQuota.ThresholdShow_textfield").value=miczImapQuota.defaultThresholdShow;
    prefs.setIntPref("show",miczImapQuota.defaultThresholdShow);
    document.getElementById("ImapQuota.ThresholdWarning_textfield").value=miczImapQuota.defaultThresholdWarning;
    prefs.setIntPref("warning",miczImapQuota.defaultThresholdWarning);
    document.getElementById("ImapQuota.ThresholdCritical_textfield").value=miczImapQuota.defaultThresholdCritical;
    prefs.setIntPref("critical",miczImapQuota.defaultThresholdCritical);    
  },

};
