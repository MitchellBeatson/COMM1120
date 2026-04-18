// Get the canvas and context
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

// Start drawing when mouse is pressed
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);  // Start drawing at the current mouse position
});

// Draw when mouse moves and is pressed
canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);  // Continue drawing to the new position
        ctx.stroke();  // Render the path
    }
});

// Stop drawing when mouse is released
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});
