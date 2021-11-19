import GetClientInstance from './client';
import GenerateScene_Prototype_01 from './scenes/prototype_01';

GetClientInstance().initialize();

const { scene, camera } = GenerateScene_Prototype_01();
GetClientInstance().loadScene(scene, camera);
