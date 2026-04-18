const container = document.querySelector('.image-container'); // The container holding the image
const image = document.getElementById('spinnableImage'); // The image element

let isDragging = false;
let lastAngle = 0;
let currentRotation = 0;

function startDrag(event) {
    isDragging = true;
    container.style.cursor = 'grabbing';

    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    lastAngle = getAngle(centerX, centerY, event.clientX, event.clientY);

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(event) {
    if (!isDragging) return;

    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newAngle = getAngle(centerX, centerY, event.clientX, event.clientY);
    const rotationChange = newAngle - lastAngle;
    currentRotation += rotationChange;
    lastAngle = newAngle; // Update the last angle for smooth rotation

    // Apply the rotation to the image
    image.style.transform = `rotate(${currentRotation}deg)`;
}

function stopDrag() {
    isDragging = false;
    container.style.cursor = 'grab';

    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

function getAngle(centerX, centerY, mouseX, mouseY) {
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI); // Convert radians to degrees
}

// Prevent the image from being dragged around normally
image.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

// Enable rotation on mousedown
container.addEventListener('mousedown', startDrag);
