/**
 * @param obj
 * @constructor
 */
var HistoryEntry = function HistoryEntry(obj) {
    this._title = obj._title;
    this._link = obj._link;
    this._date = obj._date;
    this._loaded = obj._loaded;
    this._forceOld = obj._forceOld;
    this._forceName = obj._forceName;
};

/**
 * @returns {string}
 */
HistoryEntry.prototype.getTitle = function getTitle() {
    return this._title;
};

/**
 * @returns {string}
 */
HistoryEntry.prototype.getDate = function getDate() {
    return this._date;
};

/**
 * @returns {boolean}
 */
HistoryEntry.prototype.wasLoaded = function wasLoaded() {
    return this._loaded;
};

/**
 */
HistoryEntry.prototype.setLoaded = function setLoaded() {
    this._loaded = true;
};

/**
 * @returns {boolean}
 */
HistoryEntry.prototype.isNew = function isNew() {
    var today = new Date();

    return !this._forceOld && (today.setDate(today.getDate() - 7) < Date.parse(this._date));
};

/**
 * @returns {string}
 */
HistoryEntry.prototype.getLink = function getLink() {
    return this._link;
};

HistoryEntry.prototype.forceOld = function forceOld() {
    return this._forceOld = true;
};

/**
 * @param {HistoryEntry} entry
 * @returns {boolean}
 */
HistoryEntry.prototype.isEqual = function isEqual(entry) {
    return this.getTitle() == entry.getTitle();
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
    NYAA      : 'nyaa',
    KAGE      : 'kage',
    KAGEFORUM : 'kageForum'
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

    for (var i = 0, n = titles.length; i < n; ++i) {
        for (var j = 0, m = Math.min(result.length, titles[i].length); j < m; ++j) {
            if (result[j] != titles[i][j]) {
                result = result.substring(0, j);
                break;
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
 * @param {boolean} active
 */
WatchListEntry.prototype.toggleActive = function toggleActive(active) {
    this._active = active;
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
        case WatchListEntry.prototype.ENTRY_TYPE.KAGEFORUM:
            return this._author;
        default:
            return this._author;
    }
};

/**
 * @returns {string}
 */
WatchListEntry.prototype.getAnimeName = function getAnimeName() {
    switch (this.getType()) {
        case WatchListEntry.prototype.ENTRY_TYPE.NYAA:
            var commonTitle = this._getCommonTitle();

            return /^(\[.*?])?([^0-9]*)/.exec(commonTitle)[2].trim();
        case WatchListEntry.prototype.ENTRY_TYPE.KAGE:
            return this._animeName;
        case WatchListEntry.prototype.ENTRY_TYPE.KAGEFORUM:
            return this._animeName;
        default:
            return this._animeName;
    }
};

/**
 *
 * @param newName
 * @param {boolean} [isForce]
 */
WatchListEntry.prototype.setAnimeName = function setAnimeName(newName, isForce) {
    this._animeName = newName;

    if (isForce) {
        this._forceName = true;
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
        var
              aNew = a.isNew(),
              bNew = b.isNew(),
              aDate = new Date(a.getDate()),
              bDate = new Date(b.getDate());

        if (aNew != bNew) {
            return aNew ? -1 : 1;
        }

        if (aDate.valueOf() != bDate.valueOf()) {
            return aDate < bDate ? 1 : -1;
        }

        if (a.getLink() != b.getLink()) {
            return a.getLink() < b.getLink() ? 1 : -1;
        }

        return a.getTitle() < b.getTitle() ? 1 : -1;
    });

    return result;
};

/**
 * @param {HistoryEntry} historyEntry
 */
WatchListEntry.prototype.insertHistoryEntry = function insertHistoryEntry(historyEntry) {
    this._history[historyEntry.getTitle()] = historyEntry;
};

/**
 * @param {string} historyKey
 */
WatchListEntry.prototype.deleteHistoryEntry = function deleteHistoryEntry(historyKey) {
    delete this._history[historyKey];
};

/**
 * @param {string} historyKey
 */
WatchListEntry.prototype.setLoadedHistoryEntry = function setLoadedHistoryEntry(historyKey) {
    if (this._history.hasOwnProperty(historyKey)) {
        this._history[historyKey].setLoaded();
    }
};

/**
 * @param {string} historyLink
 */
WatchListEntry.prototype.setLoadedHistoryEntryByLink = function setLoadedHistoryEntryByLink(historyLink) {
    for (var historyKey in this._history) {
        if (this._history.hasOwnProperty(historyKey)) {
            if (this._history[historyKey].getLink() == historyLink) {
                this._history[historyKey].setLoaded();
            }
        }
    }
};

/**
 */
WatchListEntry.prototype.forceOldHistory = function forceOldHistory() {
    for (var historyKey in this._history) {
        if (this._history.hasOwnProperty(historyKey)) {
            this._history[historyKey].forceOld();
        }
    }
};

/**
 */
WatchListEntry.prototype.setLoadedHistory = function setLoadedHistory() {
    for (var historyKey in this._history) {
        if (this._history.hasOwnProperty(historyKey)) {
            this._history[historyKey].setLoaded();
        }
    }
};
