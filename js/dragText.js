// Get the draggable element
const draggableText = document.getElementById("draggableText");

let isDragging = false;
let offsetX, offsetY;

// When the mouse is pressed down on the text
draggableText.addEventListener("mousedown", (e) => {
    isDragging = true;

    // Find the parent pinkBackground container
    const parentContainer = draggableText.closest(".pinkBackground");
    const parentRect = parentContainer.getBoundingClientRect();

    // Calculate the offset relative to the parent container
    offsetX = e.clientX - draggableText.getBoundingClientRect().left;
    offsetY = e.clientY - draggableText.getBoundingClientRect().top;

    // Change cursor to "grabbing" when dragging starts
    draggableText.style.cursor = "grabbing";
});

// When the mouse is moved
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const parentContainer = draggableText.closest(".pinkBackground");
        const parentRect = parentContainer.getBoundingClientRect();

        // Set position relative to the parent pinkBackground
        draggableText.style.left = e.clientX - parentRect.left - offsetX + "px";
        draggableText.style.top = e.clientY - parentRect.top - offsetY + "px";
    }
});

// When the mouse button is released
document.addEventListener("mouseup", () => {
    isDragging = false;

    // Change the cursor back to "grab" when dragging stops
    draggableText.style.cursor = "grab";
});
