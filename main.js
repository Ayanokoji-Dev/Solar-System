import * as THREE from 'https://cdn.jsdelivr.net/npm/three/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas');
// add the scene
const scene = new THREE.Scene();




// add texture loader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// add textures

const sunTexture = textureLoader.load('textures/sun.jpg')
const mercuryTexture = textureLoader.load('textures/mercury.jpg')
const venusTexture = textureLoader.load('textures/venus.jpg')
const earthTexture = textureLoader.load('textures/earth.jpg')
const marsTexture = textureLoader.load('textures/mars.jpg')
const moonTexture = textureLoader.load('textures/moon.jpg')

// add 3d background
cubeTextureLoader.setPath('textures/CubeMap/');

const spaceTexture = cubeTextureLoader.load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png',
]);

scene.background = spaceTexture;

// add materials 
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture});
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture});
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});


// add the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// add planets
const sphereGeo =new THREE.SphereGeometry(1, 16, 16);

const sunMaterial = new THREE.MeshBasicMaterial(
    {
        map: sunTexture
    }
);
const sun = new THREE.Mesh(sphereGeo, sunMaterial);

sun.scale.setScalar(5);

scene.add(sun);

const planets = [
    {
        name: 'mercury',
        radius: 0.3,
        distance: 7,
        speed: 0.01,
        material: mercuryMaterial,
        moons:[]
    },
    {
        name: 'venus',
        radius: 0.5,
        distance: 10,
        speed: 0.008,
        material: venusMaterial,
        moons:[]
    },
    {
        name: 'earth',
        radius: 1,
        distance: 15,
        speed: 0.005,
        material: earthMaterial,
        moons: [
            {
                name: 'Moon',
                radius: 0.3,
                distance: 3,
                speed: 0.015,
                material: moonMaterial
            }
        ]
    },
    {
        name: 'mars',
        radius: 0.7,
        distance: 20,
        speed: 0.003,
        material: marsMaterial,
        moons:[
            {
                name: 'Phobos',
                radius: 0.1,
                distance: 2,
                speed: 0.02,
                material: moonMaterial
            },
            {
                name: 'Deimos',
                radius: 0.1,
                distance: 3,
                speed: 0.01,
                material: moonMaterial
            }
        ]
    },
    // {
    //     name: 'jupiter',
    //     radius: 2,
    //     distance: 30,
    //     speed: 0.002,
    //     material: jupiterMaterial,
    //     moons: [
    //         {
    //             name: 'Io',
    //             radius: 0.2,
    //             distance: 4,
    //             speed: 0.02,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Europa',
    //             radius: 0.2,
    //             distance: 5,
    //             speed: 0.015,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Ganymede',
    //             radius: 0.3,
    //             distance: 6,
    //             speed: 0.01,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Callisto',
    //             radius: 0.3,
    //             distance: 7,
    //             speed: 0.005,
    //             material: moonMaterial
    //         }
    //     ]
    // },
    // {
    //     name: 'saturn',
    //     radius: 1.8,
    //     distance: 40,
    //     speed: 0.0018,
    //     material: saturnMaterial,
    //     moons: [
    //         {
    //             name: 'Titan',
    //             radius: 0.4,
    //             distance: 5,
    //             speed: 0.01,
    //             material: moonMaterial
    //         }
    //     ]
    // },
    // {
    //     name: 'uranus',
    //     radius: 1.5,
    //     distance: 50,
    //     speed: 0.0012,
    //     material: uranusMaterial,
    //     moons: [
    //         {
    //             name: 'Miranda',
    //             radius: 0.1,
    //             distance: 3,
    //             speed: 0.02,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Ariel',
    //             radius: 0.2,
    //             distance: 4,
    //             speed: 0.015,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Umbriel',
    //             radius: 0.2,
    //             distance: 5,
    //             speed: 0.01,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Titania',
    //             radius: 0.3,
    //             distance: 6,
    //             speed: 0.005,
    //             material: moonMaterial
    //         },
    //         {
    //             name: 'Oberon',
    //             radius: 0.3,
    //             distance: 7,
    //             speed: 0.002,
    //             material: moonMaterial
    //         }
    //     ]
    // },
    // {
    //     name: 'neptune',
    //     radius: 1.4,
    //     distance: 60,
    //     speed: 0.001,
    //     material: neptuneMaterial,
    //     moons: [
    //         {
    //             name: 'Triton',
    //             radius: 0.3,
    //             distance: 5,
    //             speed: 0.01,
    //             material: moonMaterial
    //         }
    //     ]
    // }
]

const planetsMeshes = planets.map((planet)=>{
    // crate the mesh
    const mesh = new THREE.Mesh(sphereGeo, planet.material);
    // set the scale
    mesh.scale.setScalar(planet.radius);
    mesh.position.x = planet.distance;
    // add it to the scene
    scene.add(mesh);
    // create moons if they exist
    if(planet.moons){
        planet.moons.forEach((moon)=>{
            const moonMesh = new THREE.Mesh(sphereGeo, moon.material);
            moonMesh.scale.setScalar(moon.radius);
            moonMesh.position.x = moon.distance;
            // add the moon to the planet
            mesh.add(moonMesh);
            planet.moons.push(moonMesh);
        })
    }
    return mesh;
})


// add the renderer
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
scene.add(pointLight);

// Add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;



// Add Animation
function animate() {
    
    planetsMeshes.forEach((planet, index)=>{
        planet.rotation.y += planets[index].speed * 5;
        planet.position.x = Math.sin(planet.rotation.y/5) * planets[index].distance;
        planet.position.z = Math.cos(planet.rotation.y/5) * planets[index].distance;

        planet.children.forEach((moon, moonIndex)=>{
            moon.rotation.y += planets[index].moons[moonIndex].speed;
            moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
            moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
        })
    })

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();