var $template = $(
    '<div class="entry">                               ' + '\n' +
    '    <label>                                       ' + '\n' +
    '        <input class="hide" type="checkbox">      ' + '\n' +
    '        <a target="_blank" class="source-link">   ' + '\n' +
    '            <img src="/images/external_link.png"> ' + '\n' +
    '        </a>                                      ' + '\n' +
    '        <span class="anime-name"></span>          ' + '\n' +
    '        <span class="author"></span>              ' + '\n' +
    '    </label>                                      ' + '\n' +
    '    <span class="delete-entry popup"></span>      ' + '\n' +
    '    <span class="unnew popup"></span>             ' + '\n' +
    '    <span class="active-toggle popup"></span>     ' + '\n' +
    '    <div class="history"></div>                   ' + '\n' +
    '</div>                                            '
);

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
        }

        var obj = {};
        obj[id] = entry;

        chrome.storage.local.set(obj);
    });
}

$(document).ready(function () {
    var
        $buttonUpdate        = $('button.update'),
        $buttonGetOptions    = $('button.getOptions'),
        $buttonLoadOptions   = $('button.loadOptions'),
        $buttonActivateAll   = $('button.activate-all'),
        $buttonDeactivateAll = $('button.deactivate-all'),
        $optionString        = $('#optionString'),
        $options             = $('input[name="options"]'),
        $nyaa                = $('.nyaa'),
        $kage                = $('.kage'),
        $dummy               = $('<div/>'),
        $load                = $('.my-pretty-load');

    $buttonUpdate.click(function () {
        var links = [];

        $load.removeClass('hidden');

        $('.entry').each(function (index, element) {
            var $element = $(element);
            if ($element.data('entry').isActive()) {
                links.push($element.data());
            }
        });

        setIntervalArray(function (data) {
            var
                link  = data.link,
                entry = data.entry;

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
        }, 400, links, function () {
            setTimeout(function () {
                repaintWatchList();
                $load.addClass('hidden');
            }, 500);
        });
    });

    $buttonGetOptions.click(function () {
        $optionString.empty();

        stringifyWatchList(function (optionString) {
            $optionString.text(optionString);
        });
    });

    $buttonLoadOptions.click(function () {
        var watchList = parseWatchList($options.val());

        chrome.storage.local.clear(function () {
            chrome.storage.local.set(watchList, function () {
                repaintWatchList();
            });
        });
    });

    $buttonActivateAll.click(function () {
        chrome.storage.local.get(null, function (result) {
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    result[key] = new WatchListEntry(result[key]);
                    result[key].toggleActive(true);
                }
            }

            chrome.storage.local.set(result);

            repaintWatchList();
        });
    });

    $buttonDeactivateAll.click(function () {
        chrome.storage.local.get(null, function (result) {
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    result[key] = new WatchListEntry(result[key]);
                    result[key].toggleActive(false);
                }
            }

            chrome.storage.local.set(result);

            repaintWatchList();
        });
    });

    var repaintWatchList = function () {
        $nyaa.empty();
        $kage.empty();

        chrome.storage.local.get(null, function (items) {
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    var
                        entry   = new WatchListEntry(items[key]),
                        history = entry.getHistory();

                    var
                        $entry      = $template.clone(),
                        $checkbox   = $entry.find('input[type="checkbox"]'),
                        $author     = $entry.find('.author'),
                        $animeName  = $entry.find('.anime-name'),
                        $history    = $entry.find('.history'),
                        $sourceLink = $entry.find('.source-link');

                    $entry.find('.unnew').data('key', key).click(function () {
                        var
                            $button = $(this),
                            key     = $button.data('key');

                        chrome.storage.local.get(key, function (result) {
                            var
                                entry      = new WatchListEntry(result[key]),
                                oldHistory = entry.getHistory();

                            for (var i = 0, n = oldHistory.length; i < n; ++i) {
                                oldHistory[i].forceOld();
                            }

                            var obj = {};
                            obj[key] = entry;

                            chrome.storage.local.set(obj);

                            repaintWatchList();
                        });
                    });

                    $entry.find('.delete-entry').data('key', key).click(function () {
                        var
                            $button = $(this),
                            key     = $button.data('key');

                        chrome.storage.local.remove(key, function () {
                            repaintWatchList();
                        });
                    });

                    $entry.find('.active-toggle').data('key', key).click(function () {
                        var
                            $button = $(this),
                            key     = $button.data('key');

                        chrome.storage.local.get(key, function (result) {
                            var entry = new WatchListEntry(result[key]);

                            entry.toggleActive(!entry.isActive());

                            var obj = {};
                            obj[key] = entry;

                            chrome.storage.local.set(obj);

                            repaintWatchList();
                        });
                    });

                    $sourceLink.attr('href', key);

                    $checkbox.attr('checked', entry.isActive()).data('key', key).change(function () {
                        var
                            $checkbox = $(this),
                            active    = $checkbox.is(':checked'),
                            key       = $checkbox.data('key');

                        chrome.storage.local.get(key, function (result) {
                            var entry = new WatchListEntry(result[key]);

                            entry.toggleActive(active);

                            var obj = {};
                            obj[key] = entry;

                            chrome.storage.local.set(obj);

                            repaintWatchList(); // sic!
                        });
                    });
                    $author.text(entry.getAuthor() || '<без автора>');
                    $animeName.text(entry.getAnimeName() || '<без названия>');

                    for (var i = 0, n = Math.min(3, history.length); i < n; ++i) {
                        var $historyEntry = $('<a/>')
                            .attr({
                                'href'     : history[i].getLink(),
                                'download' : true
                            })
                            .text(history[i].getTitle())
                            .toggleClass('loaded', history[i].wasLoaded())
                            .toggleClass('new', history[i].isNew())
                            .data({
                                'historyEntry' : history[i],
                                'key'          : key
                            })
                            .click(function () {
                                var
                                    $button    = $(this),
                                    key        = $button.data('key'),
                                    historyKey = $button.data('historyEntry').getTitle();

                                chrome.storage.local.get(key, function (result) {
                                    var entry = new WatchListEntry(result[key]);

                                    entry.setLoadedHistoryEntry(historyKey);

                                    var obj = {};
                                    obj[key] = entry;

                                    chrome.storage.local.set(obj);

                                    repaintWatchList();
                                });
                            });

                        $history.append($('<div/>').append($historyEntry));
                    }

                    $entry.toggleClass('deactivated-entry', !entry.isActive());

                    $entry.data({
                        link  : key,
                        entry : entry
                    });

                    (function () {
                        switch (entry.getType()) {
                            case WatchListEntry.prototype.ENTRY_TYPE.NYAA:
                                return $nyaa;
                            case WatchListEntry.prototype.ENTRY_TYPE.KAGE:
                                return $kage;
                            default:
                                return $dummy;
                        }
                    })().append($entry);
                }
            }
        });
    };

    repaintWatchList();
});
