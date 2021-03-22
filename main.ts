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
    show_target()
})
input.onButtonPressed(Button.A, function () {
    if (!(is_id_change_mode)) {
        change_target(-10)
    }
})
function change_target (value: number) {
    target_light = Math.min(255, Math.max(0, target_light + value))
    show_target()
}
input.onButtonPressed(Button.B, function () {
    if (!(is_id_change_mode)) {
        change_target(10)
    }
})
function change_id (change: number) {
    id += change
    id_change_timeout = control.millis() + 10000
    basic.showNumber(id)
}
function show_target () {
    led.plotBarGraph(
    target_light,
    255
    )
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
let current_light = 0
let id_change_timeout = 0
let is_id_change_mode = false
let target_light = 0
let id = 0
id = 1
target_light = Math.round(255 / 2)
show_target()
radio.setGroup(1)
basic.forever(function () {
    if (!(is_id_change_mode)) {
        current_light = input.lightLevel()
        if (Math.abs(current_light - target_light) > 0) {
            radio.sendString("" + id + "," + current_light + "," + target_light)
            basic.pause(10000)
        }
    }
})
