var template =
          '<div class="record">                ' + '\n' +
          '    <label>                         ' + '\n' +
          '        <input type="checkbox">     ' + '\n' +
          '        <span class="author"></span>' + '\n' +
          '        <span class="name"></span>  ' + '\n' +
          '    </label>                        ' + '\n' +
          '    <div class="history"></div>     ' + '\n' +
          '</div>                              ' + '\n';

$(document).ready(function () {
   var
         $button = $('button.update'),
         $nyaa = $('.nyaa'),
         $kage = $('.kage'),
         $dummy = $('<div/>');

   $button.click(function () {
      $('body').append('TODO update');
   });

   chrome.storage.local.get(null, function (items) {
      for (var key in items) {
         if (items.hasOwnProperty(key)) {
            var
                  entry = items[key],
                  $list = (function () {
                     switch (entry.type) {
                        case 'nyaa':
                           return $nyaa;
                        case 'kage':
                           return $kage;
                        default:
                           return $dummy;
                     }
                  })();

            // TODO
            $list.append($(template));
         }
      }
   });
});
