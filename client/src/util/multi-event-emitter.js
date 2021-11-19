import { EventEmitter } from 'events'

export class MultiEventEmitter extends EventEmitter {
    constructor() {
        super();
    }

    onAny(events, listener) {
        if (!Array.isArray(events)) {
            events = [ events ];
        }

        events.forEach((event) => this.on(event, listener));

        return this;
    }

    // on(...args) {
    //     console.log('on:', args);
    //     return super.on(...args);
    // }

    // emit(...args) {
    //     console.log('emit:', args);
    //     return super.emit(...args);
    // }
}

let _instance = null;

export default function GetGlobalEventsInstance(who) {
    // console.log(who, _instance);

    if (!_instance) {
        _instance = new MultiEventEmitter();
    }

    return _instance;
}