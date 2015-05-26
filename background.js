//noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
var debug = {
    lastResult : undefined,

    messIcoNyaa : 'data:image/jpeg;base64,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',

    messIcoKage : 'data:image/png;base64,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',

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
                        pageUrl : {queryContains : 'term'}
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
    var historyArray = nyaaHelpers.nyaaHistoryArray($html);

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
                        type           : 'basic',
                        iconUrl        : debug.messIcoNyaa,
                        title          : 'Новая равка!',
                        message        : historyArray[i].getTitle(),
                        contextMessage : 'Кликни, чтобы скачать'
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
        _title  : kageHelpers.getTitle($element),
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
                    type           : 'basic',
                    iconUrl        : debug.messIcoKage,
                    title          : 'Новые сабы!',
                    message        : entry.getAnimeName() + ': ' + newHistoryEntry.getTitle(),
                    contextMessage : 'Кликни, чтобы скачать'
                },
                debug.dummy
            );
        }

        var obj = {};
        obj[id] = entry;

        chrome.storage.local.set(obj);
    });
}

function updateKageForumEntry(id, entry, $html) {
    var historyArray = kageForumHelpers.kageForumHistoryArray($html);

    chrome.storage.local.get(id, function (result) {
        var
              entry      = new WatchListEntry(result[id]),
              oldHistory = entry.getHistory();

        for (var i = 0, n = historyArray.length; i < n; ++i) {
            if (!containsHistoryEntry(oldHistory, historyArray[i])) {
                entry.insertHistoryEntry(historyArray[i]);

                chrome.notifications.create(
                      id, // notificationId
                      {
                          type           : 'basic',
                          iconUrl        : debug.messIcoKage,
                          title          : 'Новае сабы на форуме!',
                          message        : historyArray[i].getTitle(),
                          contextMessage : 'Кликни, чтобы перейти на страницу форума'
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
                                case WatchListEntry.prototype.ENTRY_TYPE.KAGEFORUM:
                                    updateKageForumEntry(link, entry, $html);
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

        chrome.storage.local.get(null, function (result) {
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    var entry = new WatchListEntry(result[key]);

                    entry.setLoadedHistoryEntryByLink(notificationId);

                    result[key] = entry;
                }
            }

            chrome.storage.local.set(result);
        });

        //// TODO I'm not sure about this
        //chrome.windows.getCurrent(function (window) {
        //    var windowId = window['id'];
        //
        //    chrome.windows.update(windowId, {focused : true}, dummy);
        //});

        chrome.notifications.clear(notificationId, debug.dummy);
    });
}

chrome.runtime.onInstalled.addListener(function () {
    setAlarm();
});
chrome.runtime.onStartup.addListener(function () {
    setAlarm();
});
