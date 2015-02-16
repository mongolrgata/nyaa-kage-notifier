/**
 * Created by mongolrgata on 16.02.2015.
 */

function dummy() {
    console.log(arguments);
}

function setAlarm() {
    chrome.alarms.create('checkUpdate', {
        when            : Date.now(),
        periodInMinutes : 10
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {
        switch (alarm['name']) {
            case 'checkUpdate':
                chrome.storage.local.get('topStack', function (result) {
                    var topStackStorage = result['topStack'];

                    $.get(
                        'http://www.nyaa.se/',
                        function (data) {
                            var topStackCurrent = $(data).find(".tlist .tlistrow:first .tlistname").text();

                            if (topStackCurrent !== topStackStorage) {
                                chrome.notifications.create(
                                    "",
                                    {
                                        type    : 'basic',
                                        iconUrl : 'http://puush.me/thumb/view/fXX9h.jpg',
                                        title   : '[New Record]',
                                        message : topStackCurrent
                                    },
                                    dummy
                                );
                            }

                            chrome.storage.local.set({'topStack' : topStackCurrent});
                        }
                    );
                });
                break;
        }
    });
}

chrome.runtime.onInstalled.addListener(function () {
    setAlarm();
});
chrome.runtime.onStartup.addListener(function () {
    setAlarm();
});
