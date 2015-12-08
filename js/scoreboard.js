function Scoreboard() {
    this.crushedOpponents = 0;
    this.repulsedOpponents = 0;
    this.shootsFired = 0;
}

Scoreboard.prototype.crushedOpponent = function () {
    this.crushedOpponents++;

};

Scoreboard.prototype.repulsedOpponent = function () {
    this.repulsedOpponents++;

};

Scoreboard.prototype.shootFired = function () {
    this.shootsFired++;
};

