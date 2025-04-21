const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Renderer settings
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0a0a20); // Dark blue-purple background
document.body.appendChild(renderer.domElement);

// Create star geometry
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);

// Random star positions and colors
for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 2000;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 2000;
    
    // Give stars slight purple tints
    starColors[i3] = 0.8 + Math.random() * 0.2;     // R
    starColors[i3 + 1] = 0.5 + Math.random() * 0.3; // G
    starColors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

// Star material - now responds to lighting
const starMaterial = new THREE.PointsMaterial({
    size: 0.7,
    vertexColors: true, // Use vertex colors
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
});

// Create star points
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Add strong purple lighting
const purpleLight1 = new THREE.DirectionalLight(0xbb00ff, 1.5);
purpleLight1.position.set(1, 0, 1);
scene.add(purpleLight1);

const purpleLight2 = new THREE.DirectionalLight(0x6600cc, 0.8);
purpleLight2.position.set(-1, -1, -1);
scene.add(purpleLight2);

const ambientPurple = new THREE.AmbientLight(0x330066, 0.5);
scene.add(ambientPurple);

// Add a central glow
const glowGeometry = new THREE.SphereGeometry(150, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x9900ff,
    transparent: true,
    opacity: 0.2
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glow);

// Set camera position
camera.position.z = 800;

// Animation
function animateStars() {
    requestAnimationFrame(animateStars);

    // Star movement
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0003;
    
    // Rotate lights for dynamic effect
    purpleLight1.position.x = Math.sin(Date.now() * 0.001) * 2;
    purpleLight1.position.z = Math.cos(Date.now() * 0.001) * 2;
    
    // Pulsing glow effect
    glow.scale.x = glow.scale.y = glow.scale.z = 1 + Math.sin(Date.now() * 0.002) * 0.2;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animateStars();