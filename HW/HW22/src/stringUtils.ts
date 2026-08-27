export function capitalize(str: string): string {
    if(str.length === 0) {
        console.log("String must't be empty");
        return str
    } else {
        const arr = str.split('')
        arr[0] = arr[0]!.toUpperCase()
        return arr.join('')
    }
    
}

export function reverseString(str: string): string {
    return str.split('').reverse().join('')
}