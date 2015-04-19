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

function kageHistoryEntry($element) {
    return new HistoryEntry({
        _title  : getTitle($element),
        _link   : getLink($element),
        _date   : '' + new Date(),
        _loaded : false
    });
}
