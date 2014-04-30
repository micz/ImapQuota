"use strict";
var gQuotaUICache;
var miczImapQuota = {

  //Default Thunderbird options
  defaultThresholdShow: 75,
  defaultThresholdWarning: 80,
  defaultThresholdCritical: 95,

  //The UpdateStatusQuota function is derived from http://mxr.mozilla.org/comm-central/source/mail/base/content/commandglue.js#125
  UpdateStatusQuota: function(document,folder)
  {
    if (!(folder && // no folder selected
          folder instanceof Components.interfaces.nsIMsgImapMailFolder)) // POP etc.
    {
      if (typeof(gQuotaUICache) == "object") // ever shown quota
        gQuotaUICache.panel.hidden = true;
      return;
    }
    folder = folder.QueryInterface(Components.interfaces.nsIMsgImapMailFolder);

    // get element references and prefs
    const miczkBranch = "mail.quota.mainwindow_threshold.";
    if (typeof(gQuotaUICache) != "object")
    {
      gQuotaUICache = new Object();
      gQuotaUICache.meter = document.getElementById("quotaMeter");
      gQuotaUICache.panel = document.getElementById("quotaPanel");
      gQuotaUICache.label = document.getElementById("quotaLabel");
      gQuotaUICache.showTreshold = Services.prefs.getIntPref(miczkBranch + "show");
      gQuotaUICache.warningTreshold = Services.prefs.getIntPref(miczkBranch + "warning");
      gQuotaUICache.criticalTreshold = Services.prefs.getIntPref(miczkBranch + "critical");
    }else{  //Reload prefs BEGIN -- Added to the original UpdateStatusQuota version
      gQuotaUICache.showTreshold = Services.prefs.getIntPref(miczkBranch + "show");
      gQuotaUICache.warningTreshold = Services.prefs.getIntPref(miczkBranch + "warning");
      gQuotaUICache.criticalTreshold = Services.prefs.getIntPref(miczkBranch + "critical");
    }      //Reload prefs END

    var valid = {value: null};
    var used = {value: null};
    var max = {value: null};
    try {
      // get data from backend
      folder.getQuota(valid, used, max);
    } catch (e) { dump(e + "\n"); }
    if (valid.value && max.value > 0)
    {
      var percent = Math.round(used.value / max.value * 100);

      // show in UI
      if (percent < gQuotaUICache.showTreshold)
        gQuotaUICache.panel.hidden = true;
      else
      {
        gQuotaUICache.panel.hidden = false;
        gQuotaUICache.meter.setAttribute("value", percent);
             // do not use value property, because that is imprecise (3%)
             // for optimization that we don't need here
        var bundle = document.getElementById("bundle_messenger");
        var label = bundle.getFormattedString("percent", [percent]);
        var tooltip = bundle.getFormattedString("quotaTooltip",
                                                [used.value, max.value]);
        gQuotaUICache.label.value = label;
        gQuotaUICache.label.tooltipText = tooltip;
        if (percent < gQuotaUICache.warningTreshold)
          gQuotaUICache.panel.removeAttribute("alert");
        else if (percent < gQuotaUICache.criticalTreshold)
          gQuotaUICache.panel.setAttribute("alert", "warning");
        else
          gQuotaUICache.panel.setAttribute("alert", "critical");
      }
    }
    else
      gQuotaUICache.panel.hidden = true;
  }

};
