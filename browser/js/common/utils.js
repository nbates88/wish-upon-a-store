let formatDate = function(rawDateString) {
    let date = rawDateString.slice(0, 10).split('-');
    let months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    };
    return `${months[date[1]]} ${date[2]}, ${date[0]}`;
}


let getAverage = function(arrayOfNumbers) {
    if (arrayOfNumbers.length) {
        let len = arrayOfNumbers.length;
        let total = arrayOfNumbers.reduce(function(a, b) {
            return +a + +b;
        });
        return (Math.round((total / len) * 2) / 2).toFixed(1);
    }
}

function goBack() {
    window.history.back();
}

function totalPrice(cart) {
    var total = 0;
    if (!Array.isArray(cart)) cart = [cart];
    cart.forEach(product => {
        if (product.OrderProducts) total += +product.OrderProducts.quantity * +product.price
    })
    return total;

}
