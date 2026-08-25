const sumEvenNumbers = (numbers: number[]): number => {
    return numbers.reduce((acc, cur) => (cur % 2 === 0 ? acc + cur : acc), 0)
}

interface StringToBooleanFunction {
    (str: string): boolean
}

const isEmpty: StringToBooleanFunction = (str) => {
    return str.trim().length === 0;
}

type CompareStrings = (str1: string, str2: string) => boolean

const areEqual: CompareStrings = (str1, str2) => {
    return str1 === str2
}

function getLastElement<T>(arr: T[]): T {
    return arr[arr.length - 1]!;
}

const makeTriple = <T>(el1: T, el2: T, el3: T): T[] => {
    return [el1, el2, el3]
}