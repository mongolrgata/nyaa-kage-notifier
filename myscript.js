(function () {
   var $button = $('input[alt="Скачать"]');
   var aname = $($('tr:contains("Альтернативные названия:")')[1]).parent().find('tr:first').text().trim();
   var newWatchElem = $('<img/>').attr('src', chrome.extension.getURL('images/38.png')).css('height', 20).addClass('ololo');
   $button.each(function (index, element) {
      var $form = $(element).closest('table').find('form');
      var url = window.location.protocol + "//" + window.location.host + "/" + $form.attr("action") + "?" + $form.serialize();
      $(element).after(newWatchElem.clone().data('ololo', url));
   });

   $('.ololo').click(function () {
      var $img = $(this);
      var opop = $img.parent().next().text();
      var trans = $($img.closest('table').next().find('[href]')[0]).text().trim();

      chrome.storage.local.get(null, function (res) {
         if (!res.hasOwnProperty('kage')) {
            res.kage = {};
         }

         res.kage[$img.data('ololo')] = {
            topStack : opop,
            aname    : aname,
            trans    : trans
         };

         chrome.storage.local.set({kage : res.kage});
      });
   });
})();
