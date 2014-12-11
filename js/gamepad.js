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

    console.info(event, connecting);
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
        if (gamepad.gamepads[i].buttons[2].pressed && !gamepad.buttonPressed[2]) {
            turret.fire();
            gamepad.buttonPressed[2] = gamepad.gamepads[i].buttons[2].pressed;
        } 
        if (gamepad.buttonPressed[2] !== gamepad.gamepads[i].buttons[2].pressed) {
            gamepad.buttonPressed[2] = gamepad.gamepads[i].buttons[2].pressed;
        }
    }
};