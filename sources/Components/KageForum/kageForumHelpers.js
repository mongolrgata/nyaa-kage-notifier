var kageForumHelpers = {
    /**
     * @param $body
     */
    getAnimeName : function getAnimeName($body) {
        return $($body.find('.maintitle')[1]).text();
    },

    /**
     * @param $body
     */
    getAuthorName : function getAuthorName($body) {
        return $body.find('span.name:first').text();
    },

    /**
     * @param $element
     * @returns {string}
     */
    getTitle : function getTitle($element) {
        return $element.text();
    },

    /**
     * @param $element
     * @returns {string}
     */
    getLink : function getLink($element) {
        return $element.prop('href');
    },

    /**
     * @param $body
     * @returns {Array}
     */
    kageForumHistoryArray : function kageForumHistoryArray($body) {
        var
            $attachFiles = $body.find('table:contains("Прикрепленные файлы темы"):last'),
            $links       = $attachFiles.find('a'),
            result       = [];

        $links.each(function (index, element) {
            var $element = $(element);

            var historyEntry = new HistoryEntry({
                _title  : kageForumHelpers.getTitle($element),
                _link   : kageForumHelpers.getLink($element),
                _date   : '' + new Date(),
                _loaded : false
            });

            result.push(historyEntry);
        });

        return result;
    }
};
