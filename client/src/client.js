import Socket from './socket';
import { Clock, WebGLRenderer } from 'three';
import GetGlobalEventsInstance from './util/multi-event-emitter';

const events = GetGlobalEventsInstance();

class Client {
    constructor() {
        this._initialized = false;
    }

    initialize(params = {}) {
        if (!this._initialized) {
            events.on('socket_connected', () => console.log('Client: connected to server'));

            this.server = new Socket();
            this.server.connect(params.url);

            this.parentDomElement = params.parentDomElement || document.body;
            let width = this.parentDomElement.clientWidth;
            let height = this.parentDomElement.clientHeight;

            this.renderer = new WebGLRenderer({ antialias: true });
            this.renderer.setSize(width, height);
            this.parentDomElement.appendChild(this.renderer.domElement);

            this.clock = new Clock();

            window.addEventListener('contextmenu', (evt) => { evt.preventDefault(); return false; });

            window.addEventListener('resize', (evt) => {
                events.emit('client_resized', this.parentDomElement.innerWidth, this.parentDomElement.innerHeight);
                this.renderer.setSize(this.parentDomElement.innerWidth, this.parentDomElement.innerHeight);
            });

            this._initialized = true;
        } else {
            console.warn('Client: already initialized');
        }
    }

    loadScene(scene, camera) {
        this.renderer.setAnimationLoop(null);

        if (scene && camera) {
            this.renderer.setAnimationLoop(() => {
                const deltaTime = this.clock.getDelta();
                // console.log('deltaTime:', deltaTime);

                // TODO:
                // 1. update entities
                // 2. update services

                this.renderer.render(scene, camera);
            });
        } else {
            console.warn('Client: loadScene requires both a scene and a camera');
        }
    }
}

let _instance = null;

export default function GetClientInstance() {
    if (_instance == null) {
        _instance = new Client();
    }

    return _instance;
}