import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { planets } from "./planets";
import { sunlight, ambientLight } from "./light";

// Height and width
const width = window.innerWidth;
const height = window.innerHeight;
const aspectRatio = width / height;
// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("screen"),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Scene and camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 50, 1000);
camera.position.z = 350;

// Background texture
scene.background = new THREE.CubeTextureLoader()
  .setPath("textures/cubeMaps/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

// Sun setup
const sun = new THREE.Mesh(planets.sun.geometry, planets.sun.material);
scene.add(sun);

// Create the planets and their positions relative to the Sun
const earth = new THREE.Mesh(planets.earth.geometry, planets.earth.material);
scene.add(earth);

const moon = new THREE.Mesh(planets.moon.geometry, planets.moon.material);
earth.add(moon);

const mars = new THREE.Mesh(planets.mars.geometry, planets.mars.material);
scene.add(mars);

const jupiter = new THREE.Mesh(
  planets.jupiter.geometry,
  planets.jupiter.material
);
scene.add(jupiter);

const venus = new THREE.Mesh(planets.venus.geometry, planets.venus.material);
scene.add(venus);

const neptune = new THREE.Mesh(
  planets.neptune.geometry,
  planets.neptune.material
);
scene.add(neptune);
//saturn
const saturn = new THREE.Mesh(
  planets.neptune.geometry,
  planets.neptune.material
);
scene.add(saturn);
//saturn Ring
const saturnRing = new THREE.Mesh(
  planets.neptune.geometry,
  planets.neptune.material
);
saturnRing.rotation.x = -Math.PI / 2;
saturnRing.position.set(0, 0, 0);
scene.add(saturnRing);
// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Lighting
scene.add(sunlight);
scene.add(ambientLight);

// Zoom control
controls.minDistance = 150;
controls.maxDistance = 500;
//bloom effect
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector3(width, height),
  1.5,
  2,
  0
);
bloomPass.renderToScreen = true;
composer.addPass(bloomPass);
// Orbital distances
const orbitalDistances = {
  //planets distance from the sun
  earth: 250,
  venus: 200,
  mars: 320,
  jupiter: 420,
  neptune: -490,
  saturn: -600,
  saturnRing:-680,
  // Moon's distance from Earth
  moon: 30,
};

// Animation loop
function animate() {
  controls.update();
  const time = Date.now() * 0.0001;

  // Earth orbit
  earth.position.x = orbitalDistances.earth * Math.cos(time * 0.1);
  earth.position.z = orbitalDistances.earth * Math.sin(time * 0.1);
  earth.rotation.y += 0.003;

  // Moon orbit around Earth
  moon.position.x = orbitalDistances.moon * Math.cos(time * 0.05);
  moon.position.z = orbitalDistances.moon * Math.sin(time * 0.05);

  // Venus orbit
  venus.position.x = orbitalDistances.venus * Math.cos(time * 0.07); // Adjust speed for realistic orbit
  venus.position.z = orbitalDistances.venus * Math.sin(time * 0.07); // Adjust speed for realistic orbit
  venus.rotation.y += 0.004;

  // Mars orbit
  mars.position.x = orbitalDistances.mars * Math.cos(time * 0.08); // Adjust speed for realistic orbit
  mars.position.z = orbitalDistances.mars * Math.sin(time * 0.08); // Adjust speed for realistic orbit
  mars.rotation.y += 0.004;

  // Jupiter orbit
  jupiter.position.x = orbitalDistances.jupiter * Math.cos(time * 0.2); // Adjust speed for realistic orbit
  jupiter.position.z = orbitalDistances.jupiter * Math.sin(time * 0.2); // Adjust speed for realistic orbit
  jupiter.rotation.y += 0.005;

  // Neptune orbit
  neptune.position.x = orbitalDistances.neptune * Math.cos(time * 0.05); // Adjust speed for realistic orbit
  neptune.position.z = orbitalDistances.neptune * Math.sin(time * 0.05); // Adjust speed for realistic orbit
  neptune.rotation.y += 0.004;
  // saturn orbit
  saturn.position.x = orbitalDistances.saturn * Math.cos(time * 0.05); // Adjust speed for realistic orbit
  saturn.position.z = orbitalDistances.saturn * Math.sin(time * 0.05); // Adjust speed for realistic orbit
  saturn.rotation.y += 0.004;
   // saturnRing orbit
   saturnRing.position.x = orbitalDistances.saturnRing * Math.cos(time * 0.05); // Adjust speed for realistic orbit
   saturnRing.position.z = orbitalDistances.saturnRing * Math.sin(time * 0.05); // Adjust speed for realistic orbit
   saturnRing.rotation.y += 0.004;
  // Sun rotation (for visual effect)
  sun.rotation.y += 0.005;

  // Render the scene with post-processing effects
  composer.render();
}

// Start the animation loop
renderer.setAnimationLoop(animate);
