import GetGlobalEventsInstance from '../util/multi-event-emitter';
import { AmbientLight, BoxGeometry, Fog, Mesh, MeshStandardMaterial, PlaneGeometry, PointLight, Scene, Sprite, SpriteMaterial, TextureLoader, Vector3 } from 'three';
import { Actor } from '../actor';
import { CameraRig } from '../camera_rig';
import { randi } from '../util/rng';
import { deg2rad } from '../util/math';

const MAP_SIZE = 64;

const events = GetGlobalEventsInstance();
const xy = (x, y) => (`${x}x${y}`);

export default function GenerateScene_Prototype_01() {
    return new Promise((res, rej) => {
        events.on('level', (data) => {

            const scene = new Scene();
            // scene.fog = new Fog('black', 2, 4);

            const ambient_light = new AmbientLight(0xffffff, 1.0);
            scene.add(ambient_light);

            const floor = new Mesh(
                new PlaneGeometry(data.size, data.size, data.size - 1, data.size - 1),
                new MeshStandardMaterial({ color: 0x5555ff })
            );
            floor.rotateX(deg2rad(-90));
            floor.position.y -= 1;
            scene.add(floor);

            const cameraRig = new CameraRig();
            const offset = new Vector3(data.size / 2, 0, data.size / 2);

            for (var x = 0; x < data.size; x++) {
                for (var z = 0; z < data.size; z++) {
                    if (data[xy(x, z)] == 1) {
                        var cube = new Mesh(
                            new BoxGeometry(1, 1, 1),
                            new MeshStandardMaterial({ color: 0x222222 })
                        );

                        cube.position.x = x - offset.x;
                        cube.position.y = 0;
                        cube.position.z = z - offset.z;

                        scene.add(cube);
                    }
                }
            }

            const player = new Actor();
            player.add(cameraRig);

            const torch = new PointLight(0xffffff, 0.01, 10);
            player.add(torch);

            const plr_tex = (new TextureLoader()).load('images/knight.png');
            const mat = new SpriteMaterial({ map: plr_tex });
            const spr = new Sprite(mat);
            spr.scale.x = 0.5;
            spr.scale.y = 0.5;
            spr.scale.z = 0.5;
            player.position.y -= 0.5;
            player.add(spr);

            scene.add(player);

            const ghost_tex = (new TextureLoader()).load('images/ghost.png');
            const ghost_mat = new SpriteMaterial({ map: ghost_tex });

            for (var i = 0; i < MAP_SIZE * 2; i++) {
                const ghost = new Actor();
                const ghost_spr = new Sprite(ghost_mat);

                ghost_spr.scale.x = 0.5;
                ghost_spr.scale.y = 0.5;
                ghost_spr.scale.z = 0.5;
                ghost.position.y -= 0.5;
                ghost.add(ghost_spr);

                var placed = false;

                while (!placed) {
                    var x = (randi() % MAP_SIZE);
                    var z = (randi() % MAP_SIZE);

                    if (data[xy(x, z)] == 0) {
                        ghost.position.x = x - offset.x;
                        ghost.position.z = z - offset.z;
                        placed = true;
                    }

                }

                scene.add(ghost);
            }

            res({ scene, camera: cameraRig.camera });
        });
    });
}