(function () {
   var $body = $('body');
   var $checkbox = $('<div/>').append($('<input type="checkbox">123'));

   chrome.storage.local.get(null, function (res) {
      $body.append($('<h1>Nyaa.se</h1>'));

      if (res.nyaa) {
         for (key in res.nyaa) {
            $body.append($checkbox.clone().append(res.nyaa[key].aname + ' ', $('<span class="ololo">' + res.nyaa[key].topStack + '</span>')));
         }
      }

      $body.append($('<h1>Kage Project</h1>'));

      if (res.kage) {
         for (key in res.kage) {
            var aname = res.kage[key].aname;
            var link = key;

            var last = res.kage[key].topStack;

            var record = $('<div>' + aname + ' <span class="ololo">' + last + '</span></div>').addClass('linklink').click(function () {
               window.location = link;
            });

            $body.append($checkbox.clone().append(record));
         }
      }
   });
})();
