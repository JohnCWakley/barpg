import { Group, PerspectiveCamera } from 'three'
import { clamp, deg2rad, rad2deg } from './util/math';
import GetGlobalEventsInstance from './util/multi-event-emitter';
import GetInputInstance from './input';

const events = GetGlobalEventsInstance();
const input = GetInputInstance();

const STARTING_ANGLE = -75;

export class CameraRig extends Group {
    constructor() {
        super();

        this.sensitivity = 0.01;
        this.min_distance = 0.1;
        this.max_distance = 20.0;
        this.min_angle = deg2rad(-90);
        this.max_angle = deg2rad(0);

        this.gimbal = new Group();
        this.gimbal.rotation.x = deg2rad(STARTING_ANGLE);
        this.camera = new PerspectiveCamera(70, 1, 0.1, 1000);
        this.camera.position.z = this.max_distance / 2;

        this.gimbal.add(this.camera);
        this.add(this.gimbal);

        events.on('client_resized', (width, height) => {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        });

        events.on('input_mouse_move', evt => {
            if (input.buttonDown[2]) {
                this.gimbal.rotation.x = clamp(
                    this.gimbal.rotation.x + (-evt.movementY * this.sensitivity),
                    this.min_angle,
                    this.max_angle
                );
                
                this.rotateY(-evt.movementX * this.sensitivity);
            }
        });

        events.on('input_mouse_wheel', evt => {
            this.camera.position.z = clamp(this.camera.position.z + (evt.deltaY * this.sensitivity), this.min_distance, this.max_distance);
        });
    }
}