var kageHelpers = {

    /**
     * @param $element
     * @returns {string}
     */
    getAuthor : function getAuthor($element) {
        return $element.closest('table').nextAll(':contains("Переводчик"):first').find('[href]:first').text().trim();
    },

    /**
     * @param $element
     * @returns {string}
     */
    getTitle : function getTitle($element) {
        return $element.parent().next().text().trim();
    },

    /**
     * @param $element
     * @returns {string}
     */
    getLink : function getLink($element) {
        var $form = $element.closest('table').find('form');
        return window.location.protocol + "//" + window.location.host + "/" + $form.attr("action") + "?" + $form.serialize();
    },

    /**
     * @param $element
     * @returns {HistoryEntry}
     */
    kageHistoryEntry : function kageHistoryEntry($element) {
        return new HistoryEntry({
            _title  : kageHelpers.getTitle($element),
            _link   : kageHelpers.getLink($element),
            _date   : '' + new Date(),
            _loaded : false
        });
    }
};
