// src/components/LoadModel.js
import { GLTFLoader } from '../three/GLTFLoader.js'

export function loadHeartModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      '/models/heart.glb',
      (gltf) => {
        const model = gltf.scene
        model.scale.set(1, 1, 1)
        model.position.set(0, 0, -1)
        scene.add(model)
        resolve(model)
      },
      undefined,
      (error) => reject(error)
    )
  })
}
