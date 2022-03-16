import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import './style.css'

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(10, 0, 140);


//lights
const light0 = new THREE.PointLight(0xffffff, 0.5, 0, 2)
light0.position.set(300, 300, 200)
scene.add(light0)

const light1 = new THREE.AmbientLight(0xFBFAF5, 0.4); // soft white light
scene.add(light1);


//stars
function addStar() {
    const geometry = new THREE.SphereGeometry(1, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0x87CEEB });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(900));

    star.position.set(x, y, z);

    scene.add(star);
}
Array(200).fill().forEach(addStar);


//transparent metaman display cube
const cubeGeometry = new THREE.BoxGeometry(80, 86, 80)
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFBFAF5, transparent: true })

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMaterial.opacity = 0.5;
cubeMaterial.shininess = 100;
cube.rotation.y = -.285;
scene.add(cube);


//metaman300
loader.load('/metaman300.glb',

    function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.y = 10;
        gltf.scene.position.z = 11;

        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += .01;
        }
        animate();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);

//everything else
scene.background = new THREE.Color('0xffffff');

document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    camera.position.y = 75;
    camera.position.z = 190;
    cube.rotation.y += 0.01;
}
animate();
