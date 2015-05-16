//noinspection JSUnusedGlobalSymbols
var debug = {
    lastResult : undefined,

    messIco : 'data:image/jpeg;base64,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',

    dummy : function dummy() {
        for (var i = 0; i < arguments.length; ++i) {
            console.log(arguments[i]);
        }
    },

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

function setIntervalArray(foo, delay, array, callback) {
    var cnt = 0;

    var intervalID = setInterval(
        function () {
            if (cnt < array.length) {
                foo(array[cnt++]);
            }
            else {
                clearInterval(intervalID);
                callback();
            }
        },
        delay
    );
}

function containsHistoryEntry(historyArray, historyEntry) {
    for (var i = 0, n = historyArray.length; i < n; ++i) {
        if (historyArray[i].isEqual(historyEntry)) {
            return true;
        }
    }

    return false;
}

function updateNyaaEntry(id, $html) {
    var historyArray = nyaaHistoryArray($html);

    chrome.storage.local.get(id, function (result) {
        var
            entry      = new WatchListEntry(result[id]),
            oldHistory = entry.getHistory();

        for (var i = 0, n = historyArray.length; i < n; ++i) {
            if (!containsHistoryEntry(oldHistory, historyArray[i])) {
                entry.insertHistoryEntry(historyArray[i]);

                chrome.notifications.create(
                    historyArray[i].getLink(), // notificationId
                    {
                        type    : 'basic',
                        iconUrl : debug.messIco,
                        title   : '[Nyaa Record]',
                        message : historyArray[i].getTitle()
                    },
                    debug.dummy
                );
            }
        }

        var obj = {};
        obj[id] = entry;

        chrome.storage.local.set(obj);
    });
}

function updateKageEntry(id, entry, $html) {
    var
        link     = entry.getHistory()[0].getLink(),
        srt      = /srt=(.*)/.exec(link)[1],
        $element = $html.find('input[name="srt"][value="' + srt + '"]').parent().find('input[alt="Скачать"]');

    var newHistoryEntry = new HistoryEntry({
        _title  : getTitle($element),
        _link   : link,
        _date   : '' + new Date(),
        _loaded : false
    });

    chrome.storage.local.get(id, function (result) {
        var
            entry      = new WatchListEntry(result[id]),
            oldHistory = entry.getHistory();

        if (!containsHistoryEntry(oldHistory, newHistoryEntry)) {
            entry.insertHistoryEntry(newHistoryEntry);

            chrome.notifications.create(
                newHistoryEntry.getLink(), // notificationId
                {
                    type    : 'basic',
                    iconUrl : debug.messIco,
                    title   : '[Kage Record]',
                    message : entry.getAnimeName() + ': ' + newHistoryEntry.getTitle()
                },
                debug.dummy
            );
        }

        var obj = {};
        obj[id] = entry;

        chrome.storage.local.set(obj);
    });
}

function setAlarm() {
    chrome.alarms.create('checkUpdate', {
        when            : Date.now(),
        periodInMinutes : 20
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {
        switch (alarm['name']) {
            case 'checkUpdate':
                chrome.storage.local.get(null, function (result) {
                    var keys = [];

                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            var watchListEntry = new WatchListEntry(result[key]);

                            if (watchListEntry.isActive()) {
                                keys.push(key);
                            }
                        }
                    }

                    setIntervalArray(function (key) {
                        var
                            link  = key,
                            entry = new WatchListEntry(result[key]);

                        $.get(link, function (result) {
                            var $html = $($.parseHTML(result.replace(/<img.*?>/g, '')));

                            switch (entry.getType()) {
                                case WatchListEntry.prototype.ENTRY_TYPE.NYAA:
                                    updateNyaaEntry(link, $html);
                                    break;
                                case WatchListEntry.prototype.ENTRY_TYPE.KAGE:
                                    updateKageEntry(link, entry, $html);
                                    break;
                            }
                        });
                    }, 1000, keys, debug.dummy.bind(window, 'UPDATE END'));
                });
                break;
        }
    });

    chrome.notifications.onClicked.addListener(function (notificationId) {
        chrome.tabs.create({
            url : notificationId
        });
    });
}

chrome.runtime.onInstalled.addListener(function () {
    setAlarm();
});
chrome.runtime.onStartup.addListener(function () {
    setAlarm();
});
