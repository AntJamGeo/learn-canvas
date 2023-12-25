export function drawCircle(canvasContext, x, y, radius, colour) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, 2*Math.PI);
    canvasContext.fillStyle = colour;
    canvasContext.fill();
}

export function drawLine(canvasContext, x1, y1, x2, y2, lineColour) {
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.strokeStyle = lineColour;
    canvasContext.stroke();
}
