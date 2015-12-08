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
    var offset = 300;
    //top border
    if (this.getY() + this.getRadius() + offset < canvas.boundaries.top) {
        if (this.objectName === "Opponent")
            game.scoreBoard.repulsedOpponent();
        return true;
    }
    //bottom border
    if (this.getY() - this.getRadius() > canvas.boundaries.bottom) {
        if (this.objectName === "Opponent")
            game.scoreBoard.crushedOpponent();
        return true;
    }
    //left border
    if (this.getX() + this.getRadius() < canvas.boundaries.left) {
        if (this.objectName === "Opponent")
            game.scoreBoard.repulsedOpponent();
        return true;
    }
    //right border
    if (this.getX() - this.getRadius() > canvas.boundaries.right) {
        game.scoreBoard.repulsedOpponent();
        return true;
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

Ball.prototype.resolveCollision = function (ball) {

    v_n = ball.position.subtract(this.position); // v_n = normal vec. - a vector normal to the collision surface
    v_un = v_n.unit(); // unit normal vector
    v_ut = new Vector(-v_un.y, v_un.x); // unit tangent vector

    // Compute scalar projections of velocities onto v_un and v_ut
    v1n = v_un.dot(this.velocity); // Dot product
    v1t = v_ut.dot(this.velocity);
    v2n = v_un.dot(ball.velocity);
    v2t = v_ut.dot(ball.velocity);

    // Compute new tangential velocities
    v1tPrime = v1t; // Note: in reality, the tangential velocities do not change after the collision
    v2tPrime = v2t;

    // Compute new normal velocities using one-dimensional elastic collision equations in the normal direction
    v1nPrime = (v1n * (this.getMass() - ball.getMass()) + 2 * ball.getMass() * v2n) / (this.getMass() + ball.getMass());
    v2nPrime = (v2n * (ball.getMass() - this.getMass()) + 2 * this.getMass() * v1n) / (this.getMass() + ball.getMass());

    // Compute new normal and tangential velocity vectors
    v_v1nPrime = v_un.multiply(v1nPrime); // Multiplication by a scalar
    v_v1tPrime = v_ut.multiply(v1tPrime);
    v_v2nPrime = v_un.multiply(v2nPrime);
    v_v2tPrime = v_ut.multiply(v2tPrime);

    // Set new velocities in x and y coordinates
    this.velocity = new Vector(v_v1nPrime.x + v_v1tPrime.x, v_v1nPrime.y + v_v1tPrime.y);
    ball.velocity = new Vector(v_v2nPrime.x + v_v2tPrime.x, ball.velocity.y = v_v2nPrime.y + v_v2tPrime.y);
};