function Canvas() {
    var canvas = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;
    this.offsetX = this.width / 2;
    this.offsetY = this.height / 2;
    this.cursorX;
    this.cursorY;
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
    canvas.cursorX = cursorX;
    canvas.cursorY = cursorY;
    game.turret.calculateTurret(cursorX, cursorY);
};

Canvas.prototype.drawCursor = function () {

    this.ctx.beginPath();
    this.ctx.moveTo(canvas.cursorX - 5, canvas.cursorY);
    this.ctx.lineTo(canvas.cursorX + 5, canvas.cursorY);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(canvas.cursorX, canvas.cursorY - 5);
    this.ctx.lineTo(canvas.cursorX, canvas.cursorY + 5);
    this.ctx.stroke();

    canvas.ctx.beginPath();
    canvas.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    canvas.ctx.arc(canvas.cursorX, canvas.cursorY, 2, 0, Math.PI * 2);
    canvas.ctx.fill();
};

Canvas.prototype.drawScoreboard = function (scoreboard) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "14px Arial";
    this.ctx.fillText("Ground hits: " + scoreboard.crushedOpponents, this.boundaries.left + 20, this.boundaries.bottom - 60);
    this.ctx.fillText("Repulsed opponents: " + scoreboard.repulsedOpponents, this.boundaries.left + 20, this.boundaries.bottom - 40);
    this.ctx.fillText("Shoots fired: " + scoreboard.shootsFired, this.boundaries.left + 20, this.boundaries.bottom - 20);

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
            ball.objectName = 'Bullet';
            game.addBullet(ball);
            game.sound.shootPlay();
        }
    }
};

Canvas.prototype.clear = function () {
//    this.ctx.clearRect(this.boundaries.left, this.boundaries.top, this.width, this.height);

    //uncomment two lines below and fiddle arround with alpha value for trippy effect :P
    this.ctx.fillStyle = "rgba(255,255,255, 1)";
    this.ctx.fillRect(this.boundaries.left, this.boundaries.top, this.width, this.height);
};

Canvas.prototype.drawPause = function () {
    this.ctx.fillStyle = "black";
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillText("PAUSED", (this.boundaries.right + this.boundaries.left) / 2, this.boundaries.top + 100, 300);
};

Canvas.prototype.draw = function (object) {
    this.clear();
    this.ctx.fillStyle = "red";
    if (game.balls.length > 0)
        for (ball in game.balls) {
            var object = game.balls[ball];
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgb(0,0,0)";
            this.ctx.fillStyle = "rgba(255,255,255,255)";
            this.ctx.arc(object.getX(), object.getY(), object.getRadius(), 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.fill();
        }
    if (game.opponents.length > 0)
        for (opponent in game.opponents) {
            var object = game.opponents[opponent];
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgb(0,0,0)";
//            this.ctx.fillStyle = "rgba(255, 0, 0, " + ((0.9 * object.getEnergy() / game.maxEnergy) + 0.1) + ")";
            this.ctx.fillStyle = "rgba(255,255,255,255)";
            this.ctx.arc(object.getX(), object.getY(), object.getRadius(), 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.fill();
        }
    this.drawTurret();
    this.drawScoreboard(game.scoreBoard);
    this.drawCursor();
};

Canvas.prototype.drawTurret = function () {
    this.ctx.beginPath();

    //draw a line
    this.ctx.moveTo(game.turret.baseCoordinates.x, game.turret.baseCoordinates.y);
    this.ctx.lineTo(game.turret.turretEndCoordinates.x, game.turret.turretEndCoordinates.y);
    this.ctx.stroke();
};

