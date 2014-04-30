"use strict";
var miczImapQuotaPref = {

  update_show_check: function(){
    document.getElementById("ImapQuota.Show_checkbox").checked=(document.getElementById("ImapQuota.ThresholdShow_textfield").value==0);
  },

  update_show_value: function(){
    if(document.getElementById("ImapQuota.Show_checkbox").checked){
      document.getElementById("ImapQuota.ThresholdShow_textfield").value=0;
    }else{
      document.getElementById("ImapQuota.ThresholdShow_textfield").value=miczImapQuota.defaultThresholdShow;
    }
  },

};
