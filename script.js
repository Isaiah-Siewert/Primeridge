// Ensure THREE is loaded
if (typeof THREE === "undefined") {
  throw new Error("Three.js is not loaded");
}

// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  1000 / 500,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 500);
renderer.setClearColor(0x333333); // Dark gray background for the canvas
document.getElementById("container").appendChild(renderer.domElement);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("https://i.imgur.com/EORUSA0.png");

// Cube setup
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Rotation variables
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Event listeners for mouse drag to rotate the cube
renderer.domElement.addEventListener("mousedown", (e) => {
  isDragging = true;
});

renderer.domElement.addEventListener("mouseup", (e) => {
  isDragging = false;
});

renderer.domElement.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;
  }

  previousMousePosition = { x: e.clientX, y: e.clientY };
});

// Function to update the cube dimensions based on slider values
function updateCubeDimensions() {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);

  cube.geometry.dispose();
  cube.geometry = new THREE.BoxGeometry(length, width, height);
}

// Event listeners for sliders to update cube dimensions and display values
document.getElementById("length").addEventListener("input", (e) => {
  document.getElementById("lengthValue").textContent = e.target.value;
  updateCubeDimensions();
});
document.getElementById("width").addEventListener("input", (e) => {
  document.getElementById("widthValue").textContent = e.target.value;
  updateCubeDimensions();
});
document.getElementById("height").addEventListener("input", (e) => {
  document.getElementById("heightValue").textContent = e.target.value;
  updateCubeDimensions();
});

// Animation loop to render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  renderer.setSize(1000, 500);
  camera.aspect = 1000 / 500;
  camera.updateProjectionMatrix();
});
