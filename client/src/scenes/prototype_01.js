import { AmbientLight, BoxGeometry, Fog, Mesh, MeshStandardMaterial, PointLight, Scene, Sprite, SpriteMaterial, TextureLoader, Vector3 } from 'three';
import { Actor } from '../actor';
import { CameraRig } from '../camera_rig';
import { randi, seed } from '../util/rng';
import { generate_cavern, rand_2d_buffer } from '../util/procedural';

const MAP_SIZE = 64;

export default function GenerateScene_Prototype_01() {
    seed(47);
    
    const scene = new Scene();
    // scene.fog = new Fog('black', 2, 4);

    const cameraRig = new CameraRig();
    const walls = generate_cavern(rand_2d_buffer(MAP_SIZE, [0, 1]));
    const offset = new Vector3(walls.length / 2, 0, walls.length / 2);

    for (var x = 0; x < walls.length; x++) {
        for (var z = 0; z < walls.length; z++) {
            if (walls[x][z] == 1) {
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

    const ambient_light = new AmbientLight(0xffffff, 1.0);
    scene.add(ambient_light);

    const player = new Actor();
    player.add(cameraRig);

    const torch = new PointLight(0xffffff, 10.5, 10);
    player.add(torch);

    const plr_tex = (new TextureLoader()).load('images/knight.png');
    const mat = new SpriteMaterial({ map: plr_tex });
    const spr = new Sprite(mat);
    spr.scale.x = 0.5;
    spr.scale.y = 0.5;
    spr.scale.z = 0.5;
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
        ghost.add(ghost_spr);

        var placed = false;

        while (!placed) {
            var x = (randi() % MAP_SIZE);
            var z = (randi() % MAP_SIZE);

            if (walls[x][z] == 0) {
                ghost.position.x = x - offset.x;
                ghost.position.z = z - offset.z;
                placed = true;
            }

        }
        
        scene.add(ghost);
    }

    return { scene, camera: cameraRig.camera };
}