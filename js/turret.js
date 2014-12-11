function Turret() {
    this.baseCoordinates = new Vector((canvas.boundaries.right + canvas.boundaries.left) / 2, canvas.boundaries.bottom);
    this.cursorCoordinates = new Vector((canvas.boundaries.right + canvas.boundaries.left) / 2, canvas.boundaries.botton);
    this.length = 100;

    this.direction = null;
    this.turretEndCoordinates = new Vector((canvas.boundaries.right + canvas.boundaries.left) / 2, canvas.boundaries.bottom - this.getLength());
}

Turret.prototype.setLength = function (length) {
    this.length = parseInt(length);
};

Turret.prototype.getLength = function () {
    return this.length;
};

Turret.prototype.calculateTurret = function (cursorX, cursorY) {
    //set cursor coordinates
    this.cursorCoordinates = new Vector(cursorX, cursorY);
    //subtract coordinates of base of the turret and cursor posiotion so we have relative vector
    delta = game.turret.baseCoordinates.subtract(game.turret.cursorCoordinates);
    //calculate unit vector (directon) of a turret, length of this is one 
    this.direction = delta.unit();
    //lenghten the vector by lenght of a turret
    var turetLenght = this.direction.multiply(this.getLength());
    //subtract end of a turret from base 
    this.turretEndCoordinates = game.turret.baseCoordinates.subtract(turetLenght);
};


Turret.prototype.fire = function () {
    var ball = new Ball(game.turret.turretEndCoordinates.x, game.turret.turretEndCoordinates.y, game.bulletSize, game.bulletMass);
    ball.velocity = game.turret.direction.negative().multiply(game.bulletSpeed);
    ball.objectName = 'Bullet';
    game.addBullet(ball);
    game.sound.shootPlay();
};
