// Three.js Animation Setup
let scene, camera, renderer, redParticles, blueParticles;
let codeCubes = [], icosahedron, octahedron;
let interactiveSphere, targetPosition;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('threejs-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Initialize target position for interactive sphere
    targetPosition = new THREE.Vector3(0, 0, 0);
    
    // Create particle systems
    createParticleSystems();
    
    // Create geometric objects
    createGeometricObjects();
    
    // Create interactive sphere
    createInteractiveSphere();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0xfc466a, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3f5efb, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    animate();
}

function createParticleSystems() {
    // Create red particles
    const redGeometry = new THREE.BufferGeometry();
    const redParticlesCount = 2500;
    const redPosArray = new Float32Array(redParticlesCount * 3);
    
    for(let i = 0; i < redParticlesCount * 3; i++) {
        redPosArray[i] = (Math.random() - 0.5) * 100;
    }
    
    redGeometry.setAttribute('position', new THREE.BufferAttribute(redPosArray, 3));
    
    const redMaterial = new THREE.PointsMaterial({
        size: 0.015, // Increased size
        color: '#fc466a',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    redParticles = new THREE.Points(redGeometry, redMaterial);
    scene.add(redParticles);
    
    // Create blue particles
    const blueGeometry = new THREE.BufferGeometry();
    const blueParticlesCount = 2500;
    const bluePosArray = new Float32Array(blueParticlesCount * 3);
    
    for(let i = 0; i < blueParticlesCount * 3; i++) {
        bluePosArray[i] = (Math.random() - 0.5) * 100;
    }
    
    blueGeometry.setAttribute('position', new THREE.BufferAttribute(bluePosArray, 3));
    
    const blueMaterial = new THREE.PointsMaterial({
        size: 0.015, // Increased size
        color: '#3f5efb',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    blueParticles = new THREE.Points(blueGeometry, blueMaterial);
    scene.add(blueParticles);
}

function createGeometricObjects() {
    // Create programming cubes arrangement
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xfc466a,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });

    // Create multiple cubes arranged in a programming symbol pattern
    const positions = [
        // < symbol
        [-15, 2, 0], [-14, 1, 0], [-15, 0, 0], [-14, -1, 0], [-15, -2, 0],
        // / symbol
        [-12, 2, 0], [-11, 1, 0], [-10, 0, 0], [-9, -1, 0], [-8, -2, 0],
    ];

    positions.forEach(pos => {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(pos[0], pos[1], pos[2]);
        codeCubes.push(cube);
        scene.add(cube);
    });

    // Create icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);
    const icosahedronMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3f5efb,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.x = 15;
    scene.add(icosahedron);

    // Create octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(2, 0);
    const octahedronMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        wireframe: true
    });
    octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.y = 10;
    scene.add(octahedron);
}

function createInteractiveSphere() {
    // Create the main sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xfc466a,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    interactiveSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    // Add orbital rings
    const ringGeometry = new THREE.TorusGeometry(3, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
        color: 0x3f5efb,
        transparent: true,
        opacity: 0.5,
        wireframe: true
    });
    
    // Create three rings in different orientations
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring3 = new THREE.Mesh(ringGeometry, ringMaterial);
    
    ring2.rotation.x = Math.PI / 2;
    ring3.rotation.y = Math.PI / 2;
    
    interactiveSphere.add(ring1);
    interactiveSphere.add(ring2);
    interactiveSphere.add(ring3);
    
    scene.add(interactiveSphere);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate particles
    redParticles.rotation.x += 0.0001;
    redParticles.rotation.y += 0.0002;
    
    blueParticles.rotation.x -= 0.0002;
    blueParticles.rotation.y -= 0.0001;

    // Animate code cubes
    codeCubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(time + index) * 0.01;
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        cube.scale.set(scale, scale, scale);
    });

    // Animate icosahedron and octahedron
    icosahedron.rotation.x -= 0.007;
    icosahedron.rotation.y -= 0.01;
    icosahedron.position.y = Math.cos(time) * 2;

    octahedron.rotation.x += 0.015;
    octahedron.rotation.z += 0.01;
    octahedron.position.x = Math.sin(time * 1.5) * 5;
    
    // Animate interactive sphere
    if(mouseX !== 0 || mouseY !== 0) {
        // Convert mouse coordinates to 3D space
        targetPosition.set(
            (mouseX / window.innerWidth) * 30,
            -(mouseY / window.innerHeight) * 20,
            15
        );
        
        // Smooth movement towards target
        interactiveSphere.position.lerp(targetPosition, 0.05);
        
        // Rotate based on movement speed
        const movementSpeed = targetPosition.distanceTo(interactiveSphere.position);
        interactiveSphere.rotation.x += movementSpeed * 0.01;
        interactiveSphere.rotation.y += movementSpeed * 0.01;
        
        // Scale based on mouse distance from center
        const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const scale = 1 + (distanceFromCenter / window.innerWidth) * 0.5;
        interactiveSphere.scale.setScalar(scale);
        
        // Change color based on position
        const hue = (time * 10) % 360;
        interactiveSphere.material.color.setHSL(hue / 360, 0.8, 0.5);
    } else {
        // Idle animation when no mouse input
        interactiveSphere.rotation.x += 0.005;
        interactiveSphere.rotation.y += 0.005;
        interactiveSphere.position.y = Math.sin(time) * 2;
    }
    
    // Mouse interaction with other objects
    if(mouseX > 0) {
        redParticles.rotation.x = mouseY * 0.00008;
        redParticles.rotation.y = mouseX * 0.00008;
        
        blueParticles.rotation.x = -mouseY * 0.00008;
        blueParticles.rotation.y = -mouseX * 0.00008;

        codeCubes.forEach(cube => {
            cube.rotation.x += mouseY * 0.00001;
            cube.rotation.y += mouseX * 0.00001;
        });

        icosahedron.rotation.x += mouseY * 0.00001;
        icosahedron.rotation.y += mouseX * 0.00001;

        octahedron.rotation.x += mouseY * 0.00001;
        octahedron.rotation.z += mouseX * 0.00001;
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Enhanced mouse movement tracking with improved mobile support
let mouseX = 0;
let mouseY = 0;
let isTouching = false;

// Desktop mouse movement
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
});

// Touch events for mobile with scroll support
document.getElementById('threejs-canvas').addEventListener('touchstart', (event) => {
    isTouching = true;
    if (event.touches.length === 1) {
        mouseX = event.touches[0].clientX - window.innerWidth / 2;
        mouseY = event.touches[0].clientY - window.innerHeight / 2;
    }
}, { passive: true });

document.getElementById('threejs-canvas').addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        mouseX = event.touches[0].clientX - window.innerWidth / 2;
        mouseY = event.touches[0].clientY - window.innerHeight / 2;
    }
}, { passive: true });

document.getElementById('threejs-canvas').addEventListener('touchend', () => {
    isTouching = false;
    mouseX = 0;
    mouseY = 0;
});

// Add scroll position compensation
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    if (isTouching) {
        const deltaY = window.scrollY - lastScrollY;
        mouseY += deltaY;
    }
    lastScrollY = window.scrollY;
}, { passive: true });

window.addEventListener('resize', onWindowResize, false);

// Initialize animation
init(); 