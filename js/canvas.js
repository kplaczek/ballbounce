function Canvas() {
    var canvas = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;
    this.offsetX = this.width / 2;
    this.offsetY = this.height / 2;
    this.boundaries = {top: -this.offsetY,
        bottom: this.height - this.offsetY,
        left: -this.offsetX,
        right: this.width - this.offsetX
    };

    this.ctx.translate(this.offsetX, this.offsetY);

    this.left = canvas.offsetLeft;
    this.top = canvas.offsetTop;

    this.balls = [];
    canvas.addEventListener('click', this.click, true);
    canvas.addEventListener('mousemove', this.mousemove, true);

}
Canvas.prototype.mousemove = function (event) {
    var cursorX = event.pageX - canvas.left - canvas.offsetX;
    var cursorY = event.pageY - canvas.top - canvas.offsetY;
    game.turret.calculateTurret(cursorX, cursorY);
};

Canvas.prototype.drawScoreboard = function (scoreboard) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "14px Arial";
    this.ctx.fillText("Ground hits: "+scoreboard.crushedOpponents, this.boundaries.left+20 , this.boundaries.bottom - 60);
    this.ctx.fillText("Repulsed opponents: "+scoreboard.repulsedOpponents, this.boundaries.left+20 , this.boundaries.bottom - 40);
    this.ctx.fillText("Shoots fired: "+scoreboard.shootsFired, this.boundaries.left+20 , this.boundaries.bottom - 20);

};

Canvas.prototype.click = function (event) {
    if (!game.isPaused) {
        var x = event.pageX - canvas.left - canvas.offsetX;
        var y = event.pageY - canvas.top - canvas.offsetY;

        var point = new Vector(x, y);
        //ball clicked flag set to false
        onBallClick = false;
        //check if any ball has been clickd 
        for (i in game.balls) {
            delta = game.balls[i].position.subtract(point);
            length = delta.length();
            if (length < game.balls[i].getRadius()) {
                game.balls.splice(i, 1);
                //it is set flag to true 
                onBallClick = true;
            }
        }

        //ball has been clicked so dont add new ball to the set 
        if (!onBallClick) {
            var ball = new Ball(game.turret.turretEndCoordinates.x, game.turret.turretEndCoordinates.y, game.bulletSize, game.bulletMass);
            ball.velocity = game.turret.direction.negative().multiply(game.bulletSpeed);
            game.addBullet(ball);
            game.sound.shootPlay();
        }
    }
};

Canvas.prototype.clear = function () {
    this.ctx.clearRect(this.boundaries.left, this.boundaries.top, this.width, this.height);
};

Canvas.prototype.drawPause = function () {
    this.ctx.fillStyle = "black";
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillText("PAUSED", (this.boundaries.right + this.boundaries.left) / 2, this.boundaries.top + 100, 300);
};

Canvas.prototype.draw = function (object) {
    this.clear();
    for (ball in game.balls) {
        var object = game.balls[ball];
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255, 0, 0, " + ((0.9 * object.getEnergy() / game.maxEnergy) + 0.1) + ")";
        this.ctx.arc(object.getX(), object.getY(), object.getRadius(), 0, Math.PI * 2);
        this.ctx.fill();
    }
    for (opponent in game.opponents) {
        var object = game.opponents[opponent];
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255, 0, 0, " + ((0.9 * object.getEnergy() / game.maxEnergy) + 0.1) + ")";
        this.ctx.arc(object.getX(), object.getY(), object.getRadius(), 0, Math.PI * 2);
        this.ctx.fill();
    }
    this.drawTurret();
    this.drawScoreboard(game.scoreBoard);
};

Canvas.prototype.drawTurret = function () {
    this.ctx.beginPath();

    //draw a line
    this.ctx.moveTo(game.turret.baseCoordinates.x, game.turret.baseCoordinates.y);
    this.ctx.lineTo(game.turret.turretEndCoordinates.x, game.turret.turretEndCoordinates.y);
    this.ctx.stroke();
};

