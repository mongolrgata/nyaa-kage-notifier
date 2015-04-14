// Some magic here... i dunno lol
chrome.runtime.onInstalled.addListener(function () {
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([
         {
            conditions : [
               new chrome.declarativeContent.PageStateMatcher({
                  pageUrl : {queryContains : 'term'}
               })
            ],

            actions : [new chrome.declarativeContent.ShowPageAction()]
         }
      ]);
   });
});

alert($.fn.jquery);
