/**
 * @param $element
 * @returns {string}
 */
function getAuthor($element) {
    return $element.closest('table').nextAll(':contains("Переводчик"):first').find('[href]:first').text().trim();
}

/**
 * @param $element
 * @returns {string}
 */
function getTitle($element) {
    return $element.parent().next().text().trim();
}

/**
 * @param $element
 * @returns {string}
 */
function getLink($element) {
    var $form = $element.closest('table').find('form');
    return window.location.protocol + "//" + window.location.host + "/" + $form.attr("action") + "?" + $form.serialize();
}

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
                _author    : getAuthor($element),
                _animeName : animeName
            });

            var historyEntry = new HistoryEntry({
                _title  : getTitle($element),
                _link   : getLink($element),
                _date   : '' + new Date(),
                _loaded : false
            });

            newEntry.insertHistoryEntry(getTitle($element), historyEntry);

            var obj = {};
            obj[getLink($element)] = newEntry;

            chrome.storage.local.set(obj);
        }));
    });
});
