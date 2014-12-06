function Setting() {
    this.settings = {};
    this.load();
    this.defaultSettings = {volume: 1};
}


Setting.prototype.save = function () {
    localStorage.setItem('ballbounce', JSON.stringify(this.settings));
};

Setting.prototype.load = function () {
    if (localStorage.getItem('ballbounce') === null || localStorage.getItem('ballbounce') === "undefined") {
        this.settings = this.defaultSettings;
        this.save();
    } else {
        var retrievedObject = localStorage.getItem('ballbounce');
        this.settings = JSON.parse(retrievedObject);
    }
};

Setting.prototype.get = function (element) {
    return this.settings[element];
};

Setting.prototype.set = function (element, value) {
    this.settings[element] = value;
    this.save();
};
