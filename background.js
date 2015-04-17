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

    chrome.tabs.sendMessage(tab.id, lol);
});

function ololo() {
    chrome.storage.local.get(null, function (res) {
        console.log(res);
    });
}
