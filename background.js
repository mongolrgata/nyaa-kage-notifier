// Some magic here... i dunno lol
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions : [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl : {queryContains : 'term'} // TODO доработать условие
                    })
                ],

                actions : [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, tab.url);
});

function getAll(opop) {
    chrome.storage.local.get(opop || null, function (res) {
        console.log(res);
    });
}

function clear() {
    chrome.storage.local.clear();
}
