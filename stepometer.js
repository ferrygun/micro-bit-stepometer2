let now1 = 0
let now = 0
let Xold = 0
let timetostart = 0
let Yold = 0
let movement = false
let Xthreshold = 0
let Zold = 0
let Ythreshold = 0
let Zthreshold = 0
let command = 0
let Ymovement = 0
let my_event_id = 0
let Xmovement = 0
let timetostop = 0
let Zmovement = 0
let connected = 0
let counter = 0

bluetooth.onBluetoothConnected(() => {
    connected = 1
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(() => {
    connected = 0
    basic.showString("D")
    counter = 0
})

input.onButtonPressed(Button.A, () => {
    basic.showNumber(counter)
    basic.pause(100)
    basic.clearScreen()
})

basic.forever(() => {
    Zmovement = input.acceleration(Dimension.Z)
    Xmovement = input.acceleration(Dimension.X)
    Ymovement = input.acceleration(Dimension.Y)
    if (Zmovement != Zold) {
        if (Zmovement < Zold - Zthreshold || Zmovement > Zold + Zthreshold) {
            Zold = Zmovement
            movement = true
        }
    }
    if (Ymovement != Yold) {
        if (Ymovement < Yold - Ythreshold || Ymovement > Yold + Ythreshold) {
            Yold = Ymovement
            movement = true
        }
    }
    if (Xmovement != Xold) {
        if (Xmovement < Xold - Xthreshold || Xmovement > Xold + Xthreshold) {
            Xold = Xmovement
            movement = true
        }
    }
    if (movement) {
        movement = false
        now1 = input.runningTime()
        if (now1 > now + timetostart) {
            if (connected == 1) {
                now = input.runningTime()
                control.raiseEvent(
                    my_event_id,
                    command
                )
                counter = counter + 1
            }
        }
    } else {
        now = input.runningTime()
    }
})
timetostop = 0
my_event_id = 8888
command = 1
Zthreshold = 70
Ythreshold = 70
Xthreshold = 70
timetostart = 1500
