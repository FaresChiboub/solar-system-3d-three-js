import * as THREE from "three";


//sunlight
export const sunlight = new THREE.DirectionalLight(0xffffff, 2);
sunlight.position.set(80, 50, 50);
//ambientLight
export const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft ambient light with a slight intensity
