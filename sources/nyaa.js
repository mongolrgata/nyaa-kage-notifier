chrome.runtime.onMessage.addListener(function (message) {
   var $rows = $('.tlist').find(".tlistrow");
   var title0 = $($rows[0]).find('.tlistname').text().trim();

   var id = message;
   var newRec = {};

   newRec.type = 'nyaa';
   newRec.aname = /^(\[.*?])?(.*)/.exec(title0)[2] || "";
   newRec.author = /^(\[.*?])?/.exec(title0)[0] || "";
   newRec.isActive = true;

   newRec.history = {};

   $rows.each(function (index, element) {
      var $row = $(element);
      var title = $row.find('.tlistname').text().trim();
      var elem = newRec.history[title] = {};

      elem.link = $row.find('.tlistdownload a')[0].href;
      elem.isNew = true;
      elem.isLoaded = false;
   });

   var obj = {};
   obj[id] = newRec;

   chrome.storage.local.set(obj);
});
