$(document).ready(function () {
    var animeName = document.title;

    var
        $downloadButtons = $('input[alt="Скачать"]'),
        $template        = $('<img/>')
            .attr({
                src : chrome.extension.getURL('images/icons/38.png')
            })
            .css({
                height : 20
            });

    $downloadButtons.each(function (index, element) {
        var $element = $(element);

        $element.after($template.clone().click(function () {
            var newEntry = new WatchListEntry({
                _type      : WatchListEntry.prototype.ENTRY_TYPE.KAGE,
                _active    : true,
                _author    : kageHelpers.getAuthor($element),
                _animeName : animeName
            });

            var historyEntry = kageHelpers.kageHistoryEntry($element);

            newEntry.insertHistoryEntry(historyEntry);

            var obj = {};
            obj[document.URL] = newEntry;

            chrome.storage.local.set(obj);
        }));
    });
});
