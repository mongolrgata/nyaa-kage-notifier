chrome.runtime.onMessage.addListener(function (lol, send) {
    var opop = (function () {
        return $('body').find(".tlist .tlistrow:first .tlistname").text();
    })();

    chrome.storage.local.get(null, function (res) {
        if (!res.hasOwnProperty('nyaa')) {
            res.nyaa = {};
        }

        res.nyaa[lol] = {
            topStack : opop,
            aname    : opop.match(/(\[.*?])?(.*?)(\[|\.|-)/)[2].trim(),
            trans    : opop.match(/\[(.*?)]/)[1]
        };

        chrome.storage.local.set({nyaa : res.nyaa});
    });
});
