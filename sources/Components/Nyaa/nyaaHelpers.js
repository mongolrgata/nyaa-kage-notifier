var nyaaHelpers = {
    /**
     }
     * @param $body
     * @returns {Array}
     */
    nyaaHistoryArray : function nyaaHistoryArray($body) {
        var
            $rows  = $body.find('.tlist').find(".tlistrow"),
            result = [];

        $rows.each(function (index, element) {
            var $row = $(element);
            var link = $row.find('.tlistdownload a')[0];

            if (link.protocol === 'chrome-extension:') {
                link.protocol = 'http:';
            }

            var historyEntry = new HistoryEntry({
                _title  : $row.find('.tlistname').text().trim(),
                _link   : link.href,
                _date   : '' + new Date(),
                _loaded : false
            });

            result.push(historyEntry);
        });

        return result;
    }
};
