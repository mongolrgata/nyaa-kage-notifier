/**
 * Created by mongolrgata
 */

(function() {
   "use strict";

   /**
    * @param oldDate
    * @returns {boolean}
    */
   function wasLastWeek(oldDate, newDate) {
      var currentDate = newDate;
      var copyDate = new Date(oldDate);
      copyDate.setDate(copyDate.getDate() + 7);

      return currentDate.getDate() === copyDate.getDate();
   }

   /**
    * @param {Date} date
    * @param fullList
    * @returns {Array}
    */
   function findByDate(date, fullList) {
      var result = [];

      for (var key in fullList) {
         if (fullList.hasOwnProperty(key)) {
            var entry = new WatchListEntry(fullList[key]);
            var entryDate = new Date(entry.getHistory()[0].getDate());

            if (wasLastWeek(entryDate, date)) {
               if (entry.isActive() && entry.getType() == WatchListEntry.prototype.ENTRY_TYPE.NYAA) {
                  var params = {
                     title: entry.getAnimeName(true),
                     time: entryDate.toLocaleTimeString() + ' ' + entryDate.toLocaleDateString(),
                     originDate: entryDate
                  };

                  result.push(params);
               }
            }
         }
      }

      result.sort(function(a, b) {
         var dateA = +a.originDate;
         var dateB = +b.originDate;

         if (dateA < dateB) {
            return -1;
         } else if (dateA > dateB) {
            return +1;
         }

         return 0;
      });

      return result;
   }

   /**
    * @param {*} container
    * @param {Array} array
    */
   function createList(container, array) {
      $.get('/templates/scheduleLine.dot', function(data) {
         var dotFoo = doT.template(data);

         for (var i = 0, n = array.length; i < n; ++i) {
            container.append(dotFoo(array[i]));
         }
      });
   }

   $(document).ready(function() {
      var $today = $('#today');
      var $tomorrow = $('#tomorrow');

      chrome.storage.local.get(null, function(result) {
         var date = new Date();
         createList($today, findByDate(date, result));

         date.setDate(date.getDate() + 1);
         createList($tomorrow, findByDate(date, result));
      });
   });
})();
