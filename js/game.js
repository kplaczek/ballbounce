

function Game() {
    this.balls = [];
    this.canvas = null;
}
Game.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
}

Game.prototype.add = function(ball) {
    this.balls.push(ball);
}


Game.prototype.update = function() {
    for (ball in game.balls) {
        game.balls[ball].move();
        game.balls[ball].boardColliding();
        
    }

//    console.info(this);
//    console.info(this.canvas);
    game.canvas.draw();
//    console.info('xxx');
};