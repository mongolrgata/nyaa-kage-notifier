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

            var historyEntry = new HistoryEntry({
                _title  : $row.find('.tlistname').text().trim(),
                _link   : $row.find('.tlistdownload a')[0].href,
                _date   : '' + new Date(),
                _loaded : false
            });

            result.push(historyEntry);
        });

        return result;
    }
};
