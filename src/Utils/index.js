export function formatNumber(num) {
    let workArr = ('' + num).split('').reverse();
    let formattedArray = [];
    let count = 0;

    for (let num of workArr) {
        if (++count === 4) {
            formattedArray.push(' ', num);
            count = 1;
        } else {
            formattedArray.push(num)
        }
    }

    return formattedArray.reverse().join('');
}