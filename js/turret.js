function Turret() {
    this.baseCoordinates = new Vector((canvas.boundaries.right + canvas.boundaries.left) / 2, canvas.boundaries.bottom);
    this.cursorCoordinates = new Vector((canvas.boundaries.right + canvas.boundaries.left) / 2, canvas.boundaries.botton);
    this.length = 100;

    this.angle = 90;
    this.direction = null;
    this.turretEndCoordinates = new Vector((canvas.boundaries.right + canvas.boundaries.left) / 2, canvas.boundaries.bottom - this.getLength());
}

Turret.prototype.setLength = function (length) {
    this.length = parseInt(length);
};

Turret.prototype.getLength = function () {
    return this.length;
};

Turret.prototype.setDirection = function (direction) {
    //direction is an unit vector 

    this.angle = Math.abs(Math.atan2(direction.y, direction.x) * 180 / Math.PI);

    this.direction = direction;
    //lenghten the vector by lenght of a turret
    var turetLenght = this.direction.multiply(this.getLength());
    //subtract end of a turret from base 
    this.turretEndCoordinates = game.turret.baseCoordinates.subtract(turetLenght);
};

Turret.prototype.setAngle = function (angle) {
    var x = Math.cos(angle * Math.PI / 180) * this.length;
    var y = Math.sin(angle * Math.PI / 180) * this.length;
    var direction = new Vector(x, y);
    this.setDirection(direction.unit());
};

Turret.prototype.calculateTurret = function (cursorX, cursorY) {
    //set cursor coordinates
    this.cursorCoordinates = new Vector(cursorX, cursorY);
    //subtract coordinates of base of the turret and cursor posiotion so we have relative vector
    delta = game.turret.baseCoordinates.subtract(game.turret.cursorCoordinates);
    //calculate unit vector (directon) of a turret, length of this is one 
    this.setDirection(delta.unit());
};


Turret.prototype.fire = function () {
    var ball = new Ball(game.turret.turretEndCoordinates.x, game.turret.turretEndCoordinates.y, game.bulletSize, game.bulletMass);
    ball.velocity = game.turret.direction.negative().multiply(game.bulletSpeed);
    ball.objectName = 'Bullet';
    game.addBullet(ball);
    game.sound.shootPlay();
};
