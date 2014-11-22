function Canvas() {
    var canvas = document.getElementById('canvas');
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

}

Canvas.prototype.click = function(event) {
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
        var newMass = Math.round(Math.random() * 30) + 1;
        game.add(new Ball(x, y, newMass, newMass));
    }
};

Canvas.prototype.clear = function() {
    this.ctx.clearRect(this.boundaries.left, this.boundaries.top, this.width, this.height);
}

Canvas.prototype.draw = function(object) {
    this.clear();
    for (ball in game.balls) {
        var object = game.balls[ball];
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255, 0, 0, " + ((0.9 * object.getEnergy() / game.maxEnergy) + 0.1) + ")";
        this.ctx.arc(object.getX(), object.getY(), object.getRadius(), 0, Math.PI * 2);
        this.ctx.fill();
    }
};
