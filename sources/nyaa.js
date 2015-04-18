chrome.runtime.onMessage.addListener(function (message) {
    var $rows = $('.tlist').find(".tlistrow");

    var newEntry = new WatchListEntry({
        _type   : WatchListEntry.prototype.ENTRY_TYPE.NYAA,
        _active : true
    });

    $rows.each(function (index, element) {
        var $row = $(element);

        var historyEntry = new HistoryEntry({
            _title  : $row.find('.tlistname').text().trim(),
            _link   : $row.find('.tlistdownload a')[0].href,
            _date   : '' + new Date(),
            _loaded : false
        });

        newEntry.insertHistoryEntry('' + Math.random(), historyEntry); // TODO key
    });

    var obj = {};
    obj[message] = newEntry;

    chrome.storage.local.set(obj);
});
