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

//        if (gamepad.gamepads[i].buttons[14].pressed) {
//            if (turret.angle > 3)
//                turret.setAngle(turret.angle - 3);
//            else
//                turret.setAngle(0);
//        }
//
//        if (gamepad.gamepads[i].buttons[15].pressed) {
//            if (turret.angle < 180)
//                turret.setAngle(turret.angle + 3);
//            else
//                turret.setAngle(180);
//
//        }
        if (gamepad.gamepads[i].axes[0] < -0.2) {
            if (turret.angle > 3)
                turret.setAngle(turret.angle - Math.abs(gamepad.gamepads[i].axes[0])*3);
            else
                turret.setAngle(0);
        }

        //w prawo 
        if (gamepad.gamepads[i].axes[0] > 0.2) {
            if (turret.angle < 180)
                turret.setAngle(turret.angle + gamepad.gamepads[i].axes[0]*3);
            else
                turret.setAngle(180);

        }

        if (gamepad.gamepads[i].buttons[2].pressed && !gamepad.buttonPressed[2]) {
            turret.fire();
            gamepad.buttonPressed[2] = gamepad.gamepads[i].buttons[2].pressed;
        }
        if (gamepad.buttonPressed[2] !== gamepad.gamepads[i].buttons[2].pressed) {
            gamepad.buttonPressed[2] = gamepad.gamepads[i].buttons[2].pressed;
        }
    }
};