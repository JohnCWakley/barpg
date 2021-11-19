import GetGlobalEventsInstance from './util/multi-event-emitter';

const events = GetGlobalEventsInstance('input');

class Input {
    constructor(params = {}) {
        this.keyDown = {
            Backspace: 0, Tab: 0, Enter: 0, ShiftLeft: 0, ShiftRight: 0,
            ControlLeft: 0, ControlRight: 0, AltLeft: 0, AltRight: 0,
            Pause: 0, CapsLock: 0, Escape: 0, Space: 0, PageUp: 0,
            PageDown: 0, End: 0, Home: 0, ArrowLeft: 0, ArrowUp: 0,
            ArrowRight: 0, ArrowDown: 0, PrintScreen: 0, Insert: 0,
            Delete: 0, Digit0: 0, Digit1: 0, Digit2: 0, Digit3: 0,
            Digit4: 0, Digit5: 0, Digit6: 0, Digit7: 0, Digit8: 0,
            Digit9: 0, KeyA: 0, KeyB: 0, KeyC: 0, KeyD: 0, KeyE: 0,
            KeyF: 0, KeyG: 0, KeyH: 0, KeyI: 0, KeyJ: 0, KeyK: 0, KeyL: 0,
            KeyM: 0, KeyN: 0, KeyO: 0, KeyP: 0, KeyQ: 0, KeyR: 0, KeyS: 0,
            KeyT: 0, KeyU: 0, KeyV: 0, KeyW: 0, KeyX: 0, KeyY: 0, KeyZ: 0,
            MetaLeft: 0, MetaRight: 0, ContextMenu: 0, Numpad0: 0, Numpad1: 0,
            Numpad2: 0, Numpad3: 0, Numpad4: 0, Numpad5: 0, Numpad6: 0,
            Numpad7: 0, Numpad8: 0, Numpad9: 0, NumpadMultiply: 0, NumpadAdd: 0,
            NumpadSubtract: 0, NumpadDecimal: 0, NumpadDivide: 0, F1: 0, F2: 0,
            F3: 0, F4: 0, F5: 0, F6: 0, F7: 0, F8: 0, F9: 0, F10: 0, F11: 0,
            F12: 0, NumLock: 0, ScrollLock: 0, Semicolon: 0, Equal: 0, Comma: 0,
            Minus: 0, Period: 0, Slash: 0, Backquote: 0, BracketLeft: 0,
            Backslash: 0, BracketRight: 0, Quote: 0
        };

        this.buttonDown = new Array(32).fill(0);
        this.position = { x: 0, y: 0 };

        if (!params.enableContextMenu) {
            window.addEventListener('contextmenu', (evt) => {
                evt.preventDefault();
                return false;
            });
        }

        window.addEventListener('keydown', (evt) => {
            this.keyDown[evt.code] = 1;
            events.emit('input_key_down', evt);
        });

        window.addEventListener('keyup', (evt) => {
            this.keyDown[evt.code] = 0;
            events.emit('input_key_up', evt);
        });

        window.addEventListener('mousedown', (evt) => {
            this.buttonDown[evt.button] = 1;
            events.emit('input_button_down', evt);
        });

        window.addEventListener('mouseup', (evt) => {
            this.buttonDown[evt.button] = 0;
            events.emit('input_button_up', evt);
        });

        window.addEventListener('mousemove', (evt) => {
            this.position.x = evt.offsetX;
            this.position.y = evt.offsetY;
            events.emit('input_mouse_move', evt);
        });

        window.addEventListener('wheel', (evt) => {
            events.emit('input_mouse_wheel', evt);
        });
    }
}

let _instance = null;

export default function GetInputInstance() {
    if (!_instance) {
        _instance = new Input();
    }

    return _instance;
}