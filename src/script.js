import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

const loadManager = new THREE.LoadingManager();

loadManager.onStart = () => {
  console.log("Loading texture started");
};

loadManager.onProgress = () => {
  console.log("Loading in progress");
};

loadManager.onLoad = () => {
  console.log("Load finished");
};

loadManager.onError = () => {
  console.log("Error while loading");
};

const textureLoader = new THREE.TextureLoader(loadManager);
const colorTexture = textureLoader.load("/textures/Rock/3/basecolor.jpg");
const heightTexture = textureLoader.load("/textures/Rock/3/height.jpg");
const normalTexture = textureLoader.load("/textures/Rock/3/normal.jpg");
const ambientTexture = textureLoader.load(
  "/textures/Rock/3/ambientocclusion.jpg"
);

const mtcp = textureLoader.load("/textures/matcaps/3.png");
("../static/textures/gradients/3.jpg");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

const roughnessTexture = textureLoader.load("/textures/Rock/3/roughness.jpg");
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");

const envTexture = new THREE.CubeTextureLoader()
  .setPath("/textures/Rock/envMaps/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

const material = new THREE.MeshStandardMaterial({
  envMap: envTexture,
  // map: colorTexture, // Color texture
  //   displacementMap: heightTexture, // Height texture
  //   roughnessMap: roughnessTexture,
  //   normalMap: normalTexture,
  //   aoMap: ambientTexture,
  //   metalness: metalnessTexture,
  //   alphaMap: alphaTexture,
});

material.transparent = true;

// material.gradientMap = gradientTexture;
// gradientTexture.generateMipmaps = false;

colorTexture.repeat.x = 1;
colorTexture.repeat.y = 1;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

colorTexture.offset.set(0.5, 3);

colorTexture.rotation = Math.PI / 6;

colorTexture.center.set(0.5, 0.8);

colorTexture.magFilter = THREE.NearestFilter;
colorTexture.minFilter = THREE.NearestFilter;

// what is mip mapping,minification,minifilter,magFilter

// what are slides,three.frontSide,backside

// what is mesh basic material

// what is mesh normal material (flat shading)

// what is matcap material
// const matcapMaterial = new THREE.MeshMatcapMaterial();
// matcapMaterial.matcap = mtcp;

// what is mesh depth material

// what is mesh lambert material

// what is mesh phong material with it's properties
// what is mesh toon material with it's properties

const sphereGeometry = new THREE.SphereGeometry(4, 64, 64);

// sphereGeometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2),
//   2
// );

//material.aoMapIntensity = 3;
// const material = new THREE.MeshBasicMaterial({ map: texture });
gui.add(material, "wireframe");
gui.add(material, "roughness").max(1).min(0).step(0.001);
gui.add(material, "metalness").max(1).min(0).step(0.001);
gui.add(material, "aoMapIntensity").max(10).min(0).step(0.0001);
gui.add(material, "displacementScale").max(10).min(0).step(0.0001);

const mesh = new THREE.Mesh(sphereGeometry, material);
// const mesh = new THREE.Mesh(sphereGeometry, matcapMaterial);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xd8c2b1);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;

camera.position.z = -15;
scene.add(camera);

// const light = new THREE.DirectionalLight(0xffffff, 2);
// gui.addColor(light, "color").name("Direction Color");
// gui.add(light, "intensity").max(50).min(2).step(0.5);
// scene.add(light);

// const ambientLight = new THREE.AmbientLight(0xededed); // soft white light
// gui.addColor(ambientLight, "color").name("Ambient Color");
// scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
