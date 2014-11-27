function Game() {
    this.balls = [];
    this.opponents = [];
    this.canvas = null;
    this.maxEnergy = 0;
    this.totalEnergy = 0;
    this.turret = null;
    this.bulletSize = 4;
    this.bulletMass = 30;
    this.bulletSpeed = 10;
    this.wallBounce = false;
    this.sound = null;
    this.isPaused = 0;
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 80) {
            e.preventDefault();
            game.isPaused = (game.isPaused + 1) % 2;
            canvas.drawPause();
        }
    });
}

Game.prototype.setCanvas = function (canvas) {
    this.canvas = canvas;
};

Game.prototype.setSound = function (sound) {
    this.sound = sound;
};

Game.prototype.addBullet = function (ball) {
    this.balls.push(ball);
};
Game.prototype.addOpponents = function (opponent) {
    this.opponents.push(opponent);
};

Game.prototype.setTurret = function (turret) {
    this.turret = turret;
};

Game.prototype.update = function () {
    if (!game.isPaused) {
        var thisFrameTime = (thisLoop = new Date) - lastLoop;
        frameTime += (thisFrameTime - frameTime) / filterStrength;
        lastLoop = thisLoop;
        game.canvas.draw();
    }
};

Game.prototype.newOpponent = function () {
    if (!this.isPaused) {
        var x = game.random(canvas.boundaries.left, canvas.boundaries.right);
        var radius = game.random(20, 100);
        var y = canvas.boundaries.top - radius;
        var mass = radius;
        var opponent = new Ball(x, y, radius, mass);

        var positionOfBottom = new Vector(game.random(canvas.boundaries.left, canvas.boundaries.right), canvas.boundaries.bottom);
        var velocity = positionOfBottom.subtract(opponent.position).unit().multiply(game.random(1, 4));
        opponent.velocity = velocity;
        game.addOpponents(opponent);
    }
};
Game.prototype.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

};
Game.prototype.calculate = function () {
    if (!game.isPaused) {
        game.maxEnergy = game.totalEnergy = 0;
        for (var i = 0, e = game.balls.length; i < e; i++) {
            game.maxEnergy = Math.max(game.balls[i].getEnergy(), game.maxEnergy);
            game.totalEnergy += game.balls[i].getEnergy();
        }
        for (var i = 0, e = game.balls.length; i < game.balls.length; i++) {
            for (var j = 0, e2 = game.opponents.length; j < game.opponents.length; j++) {
                if (game.balls[i].coliding(game.opponents[j])) {
//                game.sound.colissionPlay();
                    game.balls[i].resolveCollision(game.opponents[j]);
                }
            }
        }
        for (var i = 0, e = game.balls.length; i < game.balls.length; i++) {
            game.balls[i].move();
            if (game.balls[i].outsideBoard()) {
                game.balls.splice(i, 1);
            }
        }
        for (var j = 0, e2 = game.opponents.length; j < game.opponents.length; j++) {
            game.opponents[j].move();
            if (game.opponents[j].outsideBoard()) {
                game.opponents.splice(j, 1);
            }
        }
    }
};