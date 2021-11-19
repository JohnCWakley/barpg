import GetClientInstance from './client';
import GenerateScene_Prototype_01 from './scenes/prototype_01';

GetClientInstance().initialize();

GenerateScene_Prototype_01().then((data) => {
    const { scene, camera } = data;
    GetClientInstance().loadScene(scene, camera);
})
