import * as THREE from "three";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const controller = {
    'a': {pressed: false, func: () => camera.position.x -= 0.1 },
    'd': {pressed: false, func: () => camera.position.x += 0.1 },
    's': {pressed: false, func: () => camera.position.y -= 0.1 },
    'w': {pressed: false, func: () => camera.position.y += 0.1 },
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x010B02);

let cubes = [];

for (let i = 0; i < 1000; i++) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.floor(Math.random() * i * 2) - i;
    cube.position.y = Math.floor(Math.random() * i) - i;
    cube.rotationSpeed = new THREE.Vector3(
        (Math.random() * 0.001) - 0.001,
        (Math.random() * 0.001) - 0.001,
        0
    );
    cube.zSpeed = (Math.random() * 0.001) - 0.001;
    cube.positionSpeed = new THREE.Vector3(
        (Math.random() * 0.001) - 0.001,
        (Math.random() * 0.001) - 0.001,
        0
    )
    cubes.push(cube);
}

scene.add(...cubes);

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (controller[e.key]) {
        controller[e.key].pressed = true;
    }
})

document.addEventListener('keyup', (e) => {
    if (controller[e.key]) {
        controller[e.key].pressed = false;
    }
})

camera.position.z = 10;

const executeMoves = () => {
    Object.keys(controller).forEach(key => {
        controller[key].pressed && controller[key].func()
    })
}

const animateCubes = () => {
    cubes.forEach(c => {
        c.rotation.x += c.rotationSpeed.x;
        c.rotation.y += c.rotationSpeed.y;
        c.position.z += c.zSpeed;
        c.position.x += c.positionSpeed.x;
        c.position.y += c.positionSpeed.y;
    })
}

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  executeMoves();
  animateCubes();
  renderer.render(scene, camera);
}
animate();
