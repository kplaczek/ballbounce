function Gamepad() {
    this.gamepads = [];
    this.buttonPressed = [];
    this.prevstate = false;

    window.addEventListener("gamepadconnected", function (e) {
        gamepad.gamepadHandler(e, true);
    }, false);
    window.addEventListener("gamepaddisconnected", function (e) {
        gamepad.gamepadHandler(e, false);
    }, false);
}

Gamepad.prototype.gamepadHandler = function (event, connecting) {

    if (connecting) {
        gamepad.gamepads[event.gamepad.index] = event.gamepad;
    } else {
        delete gamepad.gamepads[event.gamepad.index];
    }
};

Gamepad.prototype.init = function () {

};

Gamepad.prototype.handle = function () {


    for (var i in gamepad.gamepads) {

        if (gamepad.gamepads[i].axes[0] < -0.2) {
            if (turret.angle > 3)
                turret.setAngle(turret.angle - Math.abs(gamepad.gamepads[i].axes[0]) * 3);
            else
                turret.setAngle(0);
        }

        //w prawo 
        if (gamepad.gamepads[i].axes[0] > 0.2) {
            if (turret.angle < 180)
                turret.setAngle(turret.angle + gamepad.gamepads[i].axes[0] * 3);
            else
                turret.setAngle(180);

        }
        for (button in gamepad.gamepads[i].buttons) {
            if (gamepad.gamepads[i].buttons[button].pressed && !gamepad.buttonPressed[button]) {
                switch (button) {
                    case '2':
                        turret.fire();
                        break;
                    case '9':
                        game.togglePause();
                        break;
                    default:
                        
                        break;
                }
            }
            gamepad.buttonPressed[button] = gamepad.gamepads[i].buttons[button].pressed
        }
    }
};