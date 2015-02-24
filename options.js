/**
 * Created by mongolrgata on 22.02.2015.
 */

(function () {
    chrome.storage.local.get('watchList', function (result) {
        var wL = JSON.parse(result["watchList"]);

        for (var key in wL) {
            document.write("<input type='checkbox'>" + /*key + " | " +*/ wL[key] + "</input><br/>");
        }
    });
    //document.write('asd');
})();
