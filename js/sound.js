function Sound() {
    this.colission = 'http://www.freesound.org/data/previews/22/22768_132693-lq.mp3';
    this.shoot = 'http://www.freesound.org/data/previews/98/98190_1354367-lq.mp3';
    this.volume = settings.get('volume');
    this.volumeElement = document.getElementById('volume');
    this.volumeElement.addEventListener('change', this.setVolume, true);
    this.setElementVolume();
    this.sfx = 1;
}

Sound.prototype.setVolume = function (volume) {
    if (typeof volume === 'object') {
        volume = volume.target.value;
    }
    volume = parseInt(volume) / 100;
    if (volume >= 0 && 1 >= volume) {
        game.sound.volume = volume;
        settings.set('volume', volume);
    }
};


Sound.prototype.setElementVolume = function () {
    this.volumeElement.value = parseFloat(settings.get('volume')) * 100;
};

Sound.prototype.getVolume = function () {
    return this.volume;
};

Sound.prototype.colissionPlay = function () {
    if (this.sfx) {
        var snd = new Audio(this.colission);
        snd.volume = this.getVolume();
        snd.play();
    }
};

Sound.prototype.shootPlay = function () {
    if (this.sfx) {
        var snd = new Audio(this.shoot);
        snd.volume = this.getVolume();
        snd.play();
    }
};
