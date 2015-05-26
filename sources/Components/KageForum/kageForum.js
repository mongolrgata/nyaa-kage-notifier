$(document).ready(function () {
   var
         $body = $('body'),
         animeName = kageForumHelpers.getAnimeName($body),
         authorName = kageForumHelpers.getAuthorName($body);

   var
         $attachFilesTitle = $('td:contains("Прикрепленные файлы темы"):last'),
         $template = $('<img/>')
               .attr({
                  src : chrome.extension.getURL('images/icons/38.png')
               })
               .css({
                  height : 20
               });

   $attachFilesTitle.prepend($template.click(function () {
      var newEntry = new WatchListEntry({
         _type      : WatchListEntry.prototype.ENTRY_TYPE.KAGEFORUM,
         _active    : true,
         _author    : authorName,
         _animeName : animeName
      });

      var history = kageForumHelpers.kageForumHistoryArray($('body'));

      for (var i = 0, n = history.length; i < n; ++i) {
         newEntry.insertHistoryEntry(history[i]);
      }

      var obj = {};
      obj[document.URL] = newEntry;

      chrome.storage.local.set(obj);
   }));
});
