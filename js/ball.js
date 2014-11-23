function Ball(x, y, radius, mass) {

    this.position = new Vector(x, y);
    this.velocity = new Vector((Math.random() * -2) + 0.5, (Math.random() * -2) + 0.5);
    this.radius = radius || 10;
    this.mass = mass || 1;
    this.objectName = 'Ball';
    this.energy = (this.getMass() * this.velocity.length() * this.velocity.length()) / 2;

}

Ball.prototype.getEnergy = function () {
    this.energy = (this.getMass() * this.velocity.length() * this.velocity.length()) / 2;
    return this.energy;
}

Ball.prototype.getX = function () {
    return this.position.x;
};
Ball.prototype.getY = function () {
    return this.position.y;
};
Ball.prototype.getRadius = function () {
    return this.radius;
};
Ball.prototype.getMass = function () {
    return this.mass;
};

Ball.prototype.move = function () {
    this.position = this.position.add(this.velocity);
};

Ball.prototype.outsideBoard = function () {
    if (this.getY() + this.getRadius() < canvas.boundaries.top ||
            this.getY() - this.getRadius() > canvas.boundaries.bottom ||
            this.getX() + this.getRadius() < canvas.boundaries.left ||
            this.getX() - this.getRadius() > canvas.boundaries.right
            ) {
        return true;
    } else {
        return false;
    }
};

Ball.prototype.boardColliding = function () {
    if (this.getX() - this.radius < canvas.boundaries.left || this.getX() + this.radius > canvas.boundaries.right)
        this.velocity = this.velocity.multiply(new Vector(-1, 1, 1));

    if (this.getY() - this.radius < canvas.boundaries.top || this.getY() + this.radius > canvas.boundaries.bottom)
        this.velocity = this.velocity.multiply(new Vector(1, -1, 1));
};

Ball.prototype.coliding = function (ball) {

    var delta = this.position.subtract(ball.position);
    var distSqr = delta.length();

    var sumRadius = this.getRadius() + ball.getRadius();

    if (Math.round(distSqr) <= Math.round(sumRadius))
    {
        return true;
    }

    return false;
};