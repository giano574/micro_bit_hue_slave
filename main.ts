function blink_number (number: number) {
    basic.clearScreen()
    for (let index = 0; index < 2; index++) {
        basic.pause(200)
        basic.showNumber(number)
        basic.pause(200)
        basic.clearScreen()
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    is_id_change_mode = true
    change_id_mode()
    is_id_change_mode = false
})
input.onButtonPressed(Button.A, function () {
    if (!(is_id_change_mode)) {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(is_id_change_mode)) {
    	
    }
})
function change_id (change: number) {
    id += change
    id_change_timeout = control.millis() + 10000
    basic.showNumber(id)
}
function change_id_mode () {
    id_change_timeout = control.millis() + 10000
    basic.showNumber(id)
    while (control.millis() < id_change_timeout) {
        if (input.buttonIsPressed(Button.A)) {
            change_id(-1)
        } else if (input.buttonIsPressed(Button.B)) {
            change_id(1)
        }
    }
    blink_number(id)
}
let id_change_timeout = 0
let is_id_change_mode = false
let id = 0
id = 1
