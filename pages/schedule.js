/**
 * Created by mongolrgata
 */

(function() {
   "use strict";

   /**
    * @param {Date} date
    */
   function findByDate(date) {
      // TODO
   }

   function createList() {

   }

   $(document).ready(function() {
      var $today = $('#today');

      createList($today, findByDate(Date.now()));
   });
})();
