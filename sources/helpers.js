function stringifyWatchList(foo) {
    foo = foo || (function (base64str) {
        console.log(base64str);
    });

    chrome.storage.local.get(null, function (result) {
        foo(btoa(encodeURIComponent(JSON.stringify(result))));
    });
}

function parseWatchList(str) {
    chrome.storage.local.set(JSON.parse(decodeURIComponent(atob(str))));
}
