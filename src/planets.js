import * as THREE from "three";

export const planets = {
  earth: {
    texture: "/textures/8k_earth.jpg",
    geometry: new THREE.SphereGeometry(10, 80, 80),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_earth.jpg"),
      roughness: 0.7,
      metalness: 0.2,
    }),
  },
  sun: {
    texture: "/textures/8k_sun.jpg",
    geometry: new THREE.SphereGeometry(70, 80, 80),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_sun.jpg"),
      roughness: 0.5,
      metalness: 0.6,
      emissive: new THREE.Color("orange"),
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
    }),
  },
  moon: {
    texture: "/textures/8k_moon.jpg",
    geometry: new THREE.SphereGeometry(3, 40, 40),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_moon.jpg"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.1,
    }),
  },
  jupiter: {
    texture: "/textures/8k_jupiter.jpg",
    geometry: new THREE.SphereGeometry(40, 40, 40),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_jupiter.jpg"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.1,
    }),
  },
  mars: {
    texture: "/textures/8k_mars.jpg",
    geometry: new THREE.SphereGeometry(8, 40, 40),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_mars.jpg"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.2,
    }),
  },
  neptune: {
    texture: "/textures/2k_neptune.jpg",
    geometry: new THREE.SphereGeometry(10, 40, 40),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/2k_neptune.jpg"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.2,
    }),
  },
  venus: {
    texture: "/textures/8k_venus_surface.jpg",
    geometry: new THREE.SphereGeometry(10, 40, 40),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_venus_surface.jpg"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.2,
      emissive: new THREE.Color("orange"),
      emissiveIntensity: 0.1,
    }),
  },
  saturn: {
    texture: "/textures/8k_saturn.jpg",
    geometry: new THREE.SphereGeometry(20, 40, 40),
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_saturn.jpg"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.2,
    }),
  },
  saturnRing: {
    texture: "/textures/8k_saturn_ring.png",
    geometry: new THREE.RingGeometry( 1, 12, 32 ), 
    material: new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("/textures/8k_saturn_ring.png"),
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.2,
    }),
  },
};
