import GetGlobalEventsInstance from './util/multi-event-emitter';

const DEV_WS_URL = "ws://localhost:3000";
const events = GetGlobalEventsInstance('socket');

export default class Socket {
    constructor() {
        this._socket = null;
    }

    connect(url = DEV_WS_URL) {
        if (typeof url === "string") {
            if (this._socket === null) {
                this._socket = new WebSocket(url);

                this._socket.onopen = () => events.emit('socket_connected');
                this._socket.onclose = (evt) => events.emit('socket_disconnected', evt.code, evt.reason || 'unknown');
                this._socket.onerror = (evt) => console.error(evt);

                this._socket.onmessage = (msg) => {
                    let data = msg.data;

                    try {
                        data = JSON.parse(data);
                    } catch (err) { }

                    if (data.hasOwnProperty('event')) {
                        events.emit(data.event, data.data || null);
                        events.emit('socket_data', data);
                    } else {
                        console.warn('unknown socket data:', data);
                    }
                };
            }
        }
    }
}