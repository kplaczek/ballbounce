function Sound() {
    this.colission = 'http://www.freesound.org/data/previews/22/22768_132693-lq.mp3';
    this.shoot = 'http://www.freesound.org/data/previews/98/98190_1354367-lq.mp3';
}

Sound.prototype.colissionPlay = function () {
    var snd = new Audio(this.colission); 
    snd.play();
};

Sound.prototype.shootPlay = function () {
    var snd = new Audio(this.shoot); 
    snd.play();
};
