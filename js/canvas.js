function Canvas() {
    var canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.offsetX = 100;
    this.offsetY = 100;
    
    
    
    this.ctx.translate(this.offsetX, this.offsetY);

    this.left = canvas.offsetLeft;
    this.top = canvas.offsetTop;
    

    this.balls = [];
    canvas.addEventListener('click', this.click, true);

}

Canvas.prototype.click = function(event) {
    var x = event.pageX - canvas.left - canvas.offsetX;
    var y = event.pageY - canvas.top - canvas.offsetY;
};

Canvas.prototype.clear = function() {
    this.ctx.clearRect(-100, -100, 200, 200);
}

Canvas.prototype.draw = function(object) {
    this.clear();
    for (ball in game.balls) {
        var object = game.balls[ball];
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(200,0,0)";
        this.ctx.arc(object.getX(), object.getY(), object.getRadius(), 0, Math.PI * 2);
        this.ctx.fill();
    }
};
