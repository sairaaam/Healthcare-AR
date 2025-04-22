import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

let camera, scene, renderer, model, labelRenderer
let scale = 1
let sessionActive = false

init()

function init() {
  scene    = new THREE.Scene()
  camera   = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 20)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.xr.enabled = true
  renderer.domElement.style.display = 'none'
  document.body.appendChild(renderer.domElement)

  // CSS2DRenderer
  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top      = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  // **ensure labels are above the AR canvas**
  labelRenderer.domElement.style.zIndex = 1
  renderer.domElement.style.zIndex = 0
  document.body.appendChild(labelRenderer.domElement)

  // AR Button
  const arBtn = ARButton.createButton(renderer)
  document.body.appendChild(arBtn)

  renderer.xr.addEventListener('sessionstart', () => {
    sessionActive = true
    renderer.domElement.style.display = ''
    // Load model & labels here...
    const loader = new GLTFLoader()
    loader.load('/models/heart.glb', gltf => {
      model = gltf.scene
      model.scale.set(scale, scale, scale)
      scene.add(model)
      addLabels(model)
    })
  })
  renderer.xr.addEventListener('sessionend', () => {
    sessionActive = false
    renderer.domElement.style.display = 'none'
  })

  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1))

  renderer.setAnimationLoop(() => {
    if (!sessionActive) return
    if (model) model.rotation.y += 0.005
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
  })
}

function addLabels(model) {
  const labelData = [
    { name: 'Left Atrium',     pos: [0, 0.1, 0] },
    // ...
  ]
  labelData.forEach(({ name, pos }) => {
    const div = document.createElement('div')
    div.className = 'label'
    div.textContent = name

    const label = new CSS2DObject(div)
    label.position.set(...pos)
    model.add(label)

    setTimeout(() => div.classList.add('visible'), 500)
  })
}
