var $template = $(
    '<div class="entry">                     ' + '\n' +
    '    <label>                             ' + '\n' +
    '        <input type="checkbox">         ' + '\n' +
    '        <span class="author"></span>    ' + '\n' +
    '        <span class="anime-name"></span>' + '\n' +
    '    </label>                            ' + '\n' +
    '    <div class="history"></div>         ' + '\n' +
    '</div>                                  '
);

$(document).ready(function () {
    var
        $button = $('button.update'),
        $nyaa   = $('.nyaa'),
        $kage   = $('.kage'),
        $dummy  = $('<div/>');

    $button.click(function () {
        // TODO update active entries
        $('body').append('update');
    });

    chrome.storage.local.get(null, function (items) {
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                var
                    entry   = new WatchListEntry(items[key]),
                    history = entry.getHistory();

                var
                    $entry     = $template.clone(),
                    $checkbox  = $entry.find('input[type="checkbox"]'),
                    $author    = $entry.find('.author'),
                    $animeName = $entry.find('.anime-name'),
                    $history   = $entry.find('.history');

                $checkbox.attr('checked', entry.isActive());
                $author.text(entry.getAuthor());
                $animeName.text(entry.getAnimeName());

                for (var i = 0, n = Math.min(3, history.length); i < n; ++i) {
                    var $historyEntry = $('<div/>')
                        .text(history[i].getTitle())
                        .toggleClass('loaded', history[i].wasLoaded())
                        .toggleClass('new', history[i].isNew())
                        .data('historyEntry', history[i])
                        .click(function () {
                            // TODO click kage-type entry
                            window.location = $(this).data('historyEntry').getLink();
                        });

                    $history.append($historyEntry);
                }

                $entry.data('entry', entry);

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
});
