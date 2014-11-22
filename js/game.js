function Game() {
    this.balls = [];
    this.canvas = null;
    this.maxEnergy = 0;
    this.totalEnergy = 0;
    this.turret = null;
    this.bulletSize = 4;
    this.bulletMass = 30;
}

Game.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
};

Game.prototype.add = function(ball) {
    this.balls.push(ball);
};

Game.prototype.setTurret = function(turret) {
    this.turret = turret;
};

Game.prototype.update = function() {
    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    game.canvas.draw();
};

Game.prototype.calculate = function() {
    game.maxEnergy = game.totalEnergy = 0;
    for (var i = 0, e = game.balls.length; i < e; i++) {
        for (var j = i + 1, e = game.balls.length; j < e; j++) {

            first = game.balls[i];
            second = game.balls[j];
            if (first.coliding(second)) {
                v_n = second.position.subtract(first.position); // v_n = normal vec. - a vector normal to the collision surface
                v_un = v_n.unit(); // unit normal vector
                v_ut = new Vector(-v_un.y, v_un.x); // unit tangent vector

                // Compute scalar projections of velocities onto v_un and v_ut
                v1n = v_un.dot(first.velocity); // Dot product
                v1t = v_ut.dot(first.velocity);
                v2n = v_un.dot(second.velocity);
                v2t = v_ut.dot(second.velocity);

                // Compute new tangential velocities
                v1tPrime = v1t; // Note: in reality, the tangential velocities do not change after the collision
                v2tPrime = v2t;

                // Compute new normal velocities using one-dimensional elastic collision equations in the normal direction
                v1nPrime = (v1n * (first.getMass() - second.getMass()) + 2 * second.getMass() * v2n) / (first.getMass() + second.getMass());
                v2nPrime = (v2n * (second.getMass() - first.getMass()) + 2 * first.getMass() * v1n) / (first.getMass() + second.getMass());

                // Compute new normal and tangential velocity vectors
                v_v1nPrime = v_un.multiply(v1nPrime); // Multiplication by a scalar
                v_v1tPrime = v_ut.multiply(v1tPrime);
                v_v2nPrime = v_un.multiply(v2nPrime);
                v_v2tPrime = v_ut.multiply(v2tPrime);

                // Set new velocities in x and y coordinates
                first.velocity.x = v_v1nPrime.x + v_v1tPrime.x;
                first.velocity.y = v_v1nPrime.y + v_v1tPrime.y;
                second.velocity.x = v_v2nPrime.x + v_v2tPrime.x;
                second.velocity.y = v_v2nPrime.y + v_v2tPrime.y;

            }
        }

        game.maxEnergy = Math.max(game.balls[i].getEnergy(), game.maxEnergy);
        game.totalEnergy += game.balls[i].getEnergy();
        game.balls[i].boardColliding();
        game.balls[i].move();

    }
};