let size = 200;
const colors = ['red', 'green', 'blue'];
let colorIndex = 0;

const balloon = document.getElementById('balloon');
let shrinkInterval = null;

balloon.addEventListener('click', () => {
    clearInterval(shrinkInterval);

    size += 10;
    if (size > 420) {
        size = 200; 
        colorIndex = 0; 
    } else {
        colorIndex = (colorIndex + 1) % colors.length;
    }
    updateBalloon();
});

balloon.addEventListener('mouseenter', () => {
    clearInterval(shrinkInterval);
});


balloon.addEventListener('mouseleave', () => {
    clearInterval(shrinkInterval);

    shrinkInterval = setInterval(() => {
        if (size > 200) {
            size -= 5;
            if (size < 200) {
                size = 200;
            }
            colorIndex = (colorIndex - 1 + colors.length) % colors.length;
            updateBalloon();
        } else {
            clearInterval(shrinkInterval); 
        }
    }, 100); 
});

function updateBalloon() {
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}