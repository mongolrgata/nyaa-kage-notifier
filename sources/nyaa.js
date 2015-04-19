chrome.runtime.onMessage.addListener(function () {
    var newEntry = new WatchListEntry({
        _type   : WatchListEntry.prototype.ENTRY_TYPE.NYAA,
        _active : true
    });

    var history = nyaaHistoryArray($('body'));

    for (var i = 0, n = history.length; i < n; ++i) {
        newEntry.insertHistoryEntry(history[i]);
    }

    var obj = {};
    obj[document.URL] = newEntry;

    chrome.storage.local.set(obj);
});
