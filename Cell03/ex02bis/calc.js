setInterval(() => {
    alert('Please, use me...');
}, 30000);

$('#calc-form').on('submit', function(e) {
    e.preventDefault();

    const leftVal = $('#left-val').val();
    const operator = $('#operator').val();
    const rightVal = $('#right-val').val();

    if (!isPositiveInteger(leftVal) || !isPositiveInteger(rightVal)) {
        alert('Error :(');
        return;
    }

    const num1 = parseInt(leftVal, 10);
    const num2 = parseInt(rightVal, 10);

    if ((operator === '/' || operator === '%') && num2 === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    let result = 0;
    switch (operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        case '%': result = num1 % num2; break;
    }

    alert(result);
    console.log(result);
});

function isPositiveInteger(str) {
    if (typeof str !== 'string') return false;
    const trimmed = str.trim();
    if (trimmed === '') return false;
    const num = Number(trimmed);
    return Number.isInteger(num) && num >= 0 && trimmed === String(num);
}