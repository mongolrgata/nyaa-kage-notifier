/**
 * @param obj
 * @constructor
 */
var HistoryEntry = function HistoryEntry(obj) {
    this._title = obj._title;
    this._link = obj._link;
    this._date = obj._date;
    this._loaded = obj._loaded;
};

/**
 * @returns {string}
 */
HistoryEntry.prototype.getTitle = function getTitle() {
    return this._title;
};

/**
 * @returns {boolean}
 */
HistoryEntry.prototype.wasLoaded = function wasLoaded() {
    return this._loaded;
};

/**
 * @returns {boolean}
 */
HistoryEntry.prototype.isNew = function isNew() {
    var today = new Date();

    return today.setDate(today.getDate() - 2) < Date.parse(this._date);
};

/**
 * @returns {string}
 */
HistoryEntry.prototype.getLink = function getLink() {
    return this._link;
};

/**
 * @param obj
 * @constructor
 */
var WatchListEntry = function WatchListEntry(obj) {
    this._type = obj._type;
    this._active = obj._active;
    this._author = obj._author;
    this._animeName = obj._animeName;
    this._history = {};

    for (var key in obj._history) {
        if (obj._history.hasOwnProperty(key)) {
            this._history[key] = new HistoryEntry(obj._history[key]);
        }
    }
};

/**
 * @type {{NYAA: string, KAGE: string}}
 */
WatchListEntry.prototype.ENTRY_TYPE = {
    NYAA : 'nyaa',
    KAGE : 'kage'
};

/**
 * @returns {string[]}
 * @private
 */
WatchListEntry.prototype._getHistoryTitles = function _getHistoryTitles() {
    var
        history = this.getHistory(),
        result  = [];

    for (var i = 0, n = history.length; i < n; ++i) {
        result.push(history[i].getTitle());
    }

    return result;
};

/**
 * @returns {string}
 * @private
 */
WatchListEntry.prototype._getCommonTitle = function _getCommonTitle() {
    var titles = this._getHistoryTitles();

    if (titles.length == 0) {
        return '';
    }

    var result = titles[0];

    m: for (var i = 0, n = titles.length; i < n; ++i) {
        for (var j = 0, m = Math.min(result.length, titles[i].length); j < m; ++j) {
            if (result[j] != titles[i][j]) {
                result = result.substring(0, j);
                continue m;
            }
        }
    }

    return result;
};

/**
 * @returns {string}
 */
WatchListEntry.prototype.getType = function getType() {
    return this._type;
};

/**
 * @returns {boolean}
 */
WatchListEntry.prototype.isActive = function isActive() {
    return this._active;
};

/**
 * @returns {string}
 */
WatchListEntry.prototype.getAuthor = function getAuthor() {
    switch (this.getType()) {
        case WatchListEntry.prototype.ENTRY_TYPE.NYAA:
            var commonTitle = this._getCommonTitle();

            return /^(\[.*?])?/.exec(commonTitle)[0];
        case WatchListEntry.prototype.ENTRY_TYPE.KAGE:
            return this._author;
        default:
            return '';
    }
};

/**
 * @returns {string}
 */
WatchListEntry.prototype.getAnimeName = function getAnimeName() {
    switch (this.getType()) {
        case WatchListEntry.prototype.ENTRY_TYPE.NYAA:
            var commonTitle = this._getCommonTitle();

            return /^(\[.*?])?(.*)/.exec(commonTitle)[2].trim();
        case WatchListEntry.prototype.ENTRY_TYPE.KAGE:
            return this._animeName;
        default:
            return '';
    }
};

/**
 * @returns {HistoryEntry[]}
 */
WatchListEntry.prototype.getHistory = function getHistory() {
    var result = [];

    for (var key in this._history) {
        if (this._history.hasOwnProperty(key)) {
            result.push(this._history[key]);
        }
    }

    result.sort(function (a, b) {
        return a.getLink() > b.getLink() ? -1 : 1;
    });

    return result;
};

/**
 * @param {string} key
 * @param {HistoryEntry} historyEntry
 */
WatchListEntry.prototype.insertHistoryEntry = function insertHistoryEntry(key, historyEntry) {
    this._history[key] = historyEntry;
};
