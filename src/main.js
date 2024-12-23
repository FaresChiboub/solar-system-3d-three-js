import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

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
camera.position.z = 250;

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Background texture
scene.background = new THREE.CubeTextureLoader()
  .setPath("textures/cubeMaps/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

// Sun setup (MeshBasicMaterial for the Sun as it does not need lighting)
const sunTexture = textureLoader.load("/textures/8k_sun.jpg");
const sunGeometry = new THREE.SphereGeometry(40, 40, 40);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.position.x = 0;
sun.position.z = 5;

// Earth setup with MeshStandardMaterial (to interact with light)
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
const earthGeometry = new THREE.SphereGeometry(10, 80, 80);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
  roughness: 0.5, // Slight roughness for realistic shading
  metalness: 0.6, // Slight metalness for more realistic reflections
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);
earth.position.x = 120;
earth.position.z = 5;

// Moon setup with MeshStandardMaterial (to interact with light)
const moonTexture = textureLoader.load("/textures/8k_moon.jpg");
const moonGeometry = new THREE.SphereGeometry(3, 40, 40);
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
  side: THREE.DoubleSide,
  roughness: 0.5,
  metalness: 0.6,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
earth.add(moon); // Add moon as child of Earth

// Lighting setup
// A strong directional light that mimics sunlight
const sunlight = new THREE.DirectionalLight(0xffffff, 2);
sunlight.position.set(30, 30, 30); // Position it slightly above and to the right
scene.add(sunlight);

// Ambient light to fill the scene (soft light without directional shadowing)
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft ambient light with a slight intensity
scene.add(ambientLight);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const composer = new EffectComposer(renderer);

// Create the render pass
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Create the UnrealBloomPass (for the bloom effect)
const bloomPass = new UnrealBloomPass(
  new THREE.Vector3(width, height),
  1.2, // Strength
  1.2, // Bloom radius
  0 // Threshold
);
controls.minDistance = 200; 
controls.maxDistance = 400;
composer.addPass(bloomPass);

// Animation loop
function animate() {
  controls.update();

  // Earth's orbit around the Sun
  const time = Date.now() * 0.0001;
  earth.position.x = 150 * Math.cos(time);
  earth.position.z = 150 * Math.sin(time);
  earth.rotation.y += 0.003;
  sun.rotation.y += 0.005;

  // Rotate the Moon around the Earth (using a local coordinate system)
  const moonOrbitRadius = 30; // Distance between Earth and Moon
  const moonOrbitSpeed = 0.0015; // Moon's orbit speed around Earth
  moon.position.x = moonOrbitRadius * Math.cos(time * moonOrbitSpeed); // Moon's X position
  moon.position.z = moonOrbitRadius * Math.sin(time * moonOrbitSpeed); // Moon's Z position

  // Render the scene with post-processing effects
  composer.render();
}

// Start the animation loop
renderer.setAnimationLoop(animate);
