// Elements selection
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const bgColorPicker = document.getElementById('bgColorPicker');

let img = new Image();
let dragging = false;
let imgX = 0, imgY = 0, imgWidth, imgHeight;
let initialMouseX, initialMouseY, initialImgWidth, initialImgHeight;

// Load the image
img.src = '/canvas.png';  
img.onload = () => {
    const maxWidth = canvas.clientWidth;
    const maxHeight = canvas.clientHeight;
    const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
    imgWidth = img.width * scale;
    imgHeight = img.height * scale;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    drawImage();
};

// Draw the image with the current background color
function drawImage() {
    ctx.fillStyle = bgColorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
}

// Update the canvas background color when the color picker changes
bgColorPicker.addEventListener('input', drawImage);

// Mouse events for resizing the image
canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
    initialImgWidth = imgWidth;
    initialImgHeight = imgHeight;
});

canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;
        imgWidth = initialImgWidth + deltaX;
        imgHeight = initialImgHeight + deltaY;
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        drawImage();
    }
});

canvas.addEventListener('mouseup', () => {
    dragging = false;
});

canvas.addEventListener('mouseout', () => {
    dragging = false;
});
