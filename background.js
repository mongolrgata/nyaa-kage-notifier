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

chrome.pageAction.onClicked.addListener(function (tab) {
   var lol = tab.url;

   chrome.tabs.executeScript(
         tab.id,
         {
            code : "                                                              " +
            "(function(){                                                         " +
            "  return $('body').find(\".tlist .tlistrow:first .tlistname\").text();" +
            "})();                                                                 "
         },
         function (result) {
            var opop = result[0];

            chrome.storage.local.get(null, function (res) {
               if (!res.hasOwnProperty('nyaa')) {
                  res.nyaa = {};
               }

               res.nyaa[lol] = {
                  topStack : opop,
                  aname    : opop.match(/(\[.*?])?(.*?)(\[|\.|-)/)[2].trim(),
                  trans    : opop.match(/\[(.*?)]/)[1]
               };

               chrome.storage.local.set({nyaa : res.nyaa});
            });
         }
   );
});
