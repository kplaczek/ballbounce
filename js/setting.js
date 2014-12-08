function Setting() {
    this.settings = {};
    this.defaultSettings = {volume: 1};
	this.load();
}


Setting.prototype.save = function () {
    localStorage.setItem('ballbounce', JSON.stringify(this.settings));
};

Setting.prototype.load = function () {
	console.info(this.defaultSettings);
    if (localStorage.getItem('ballbounce') === null || localStorage.getItem('ballbounce') === "undefined" || localStorage.getItem('ballbounce') === "{}") {
        this.settings = this.defaultSettings;
		console.info(this.defaultSettings);
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
