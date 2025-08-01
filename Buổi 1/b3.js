let isCircle = false;

function toggleShape() {
    const shape = document.getElementById("shape");
    isCircle = !isCircle;
    shape.style.borderRadius = isCircle ? "50%" : "0%"; // Mới tìm hiểu
}