//noinspection JSUnusedGlobalSymbols
var debug = {
    lastResult : undefined,

    getStorage : function getNull() {
        chrome.storage.local.get(null, function (res) {
            console.log(debug.lastResult = res);
        });
    },

    clearStorage : function clear() {
        chrome.storage.local.clear();
    }
};

// Some magic here... i dunno lol
chrome.runtime.onInstalled.addListener(function () {
    //noinspection JSUnresolvedVariable
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions : [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl : {queryContains : 'term'} // TODO change condition
                    })
                ],

                actions : [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, {});
});
