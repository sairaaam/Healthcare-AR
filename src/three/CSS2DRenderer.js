import {
    Scene,
    Camera,
    Vector3
  } from 'three';
  
  class CSS2DObject extends HTMLElement {
    constructor(element) {
      super();
      this.element = element;
      this.element.style.position = 'absolute';
    }
  }
  
  class CSS2DRenderer {
    constructor() {
      this.domElement = document.createElement('div');
      this.domElement.style.position = 'absolute';
      this.domElement.style.top = '0';
      this.domElement.style.pointerEvents = 'none';
    }
  
    render(scene, camera) {
      scene.traverse(object => {
        if (object instanceof CSS2DObject) {
          const vector = new Vector3().setFromMatrixPosition(object.matrixWorld).project(camera);
          const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
          const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;
          object.element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
        }
      });
    }
  }
  
  export { CSS2DObject, CSS2DRenderer };
  