(function() {
   var $button = $('input[alt="Скачать"]');
   var newWatchElem = $('<img/>').attr('src', chrome.extension.getURL('images/38.png')).css('height', 20);
   $button.each(function(index, element) {
      $(element).after(newWatchElem.clone());
   });
})();
