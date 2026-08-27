export function capitalize(str) {
    if (str.length === 0) {
        console.log("String must't be empty");
        return str;
    }
    else {
        const arr = str.split('');
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
    }
}
export function reverseString(str) {
    return str.split('').reverse().join('');
}
