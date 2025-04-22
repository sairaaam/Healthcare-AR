// src/components/Labels.js
import { CSS2DObject } from '../three/CSS2DRenderer.js'

export function addHeartLabels(model) {
  const parts = [
    { name: 'Left Atrium', objectName: 'LeftAtrium', offset: [0, 0.1, 0] },
    { name: 'Right Atrium', objectName: 'RightAtrium', offset: [0.1, 0.1, 0] },
    { name: 'Left Ventricle', objectName: 'LeftVentricle', offset: [-0.1, -0.05, 0] },
    { name: 'Right Ventricle', objectName: 'RightVentricle', offset: [0.1, -0.05, 0] }
  ]

  parts.forEach(({ name, objectName, offset }) => {
    const part = model.getObjectByName(objectName)
    if (!part) return

    const div = document.createElement('div')
    div.className = 'label'
    div.textContent = name
    // animate fade-in
    div.style.opacity = 0
    div.style.transition = 'opacity 1s ease'
    setTimeout(() => (div.style.opacity = 1), 500)

    const label = new CSS2DObject(div)
    label.position.set(...offset)
    part.add(label)
  })
}
