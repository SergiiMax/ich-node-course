// Обработка неизвестного типа

let data: unknown;

function processData(value: unknown): number | null {
  if (typeof value === "string") {
    return value.length;
  }

  if (typeof value === "number") {
    return value ** 2;
  }

  return null;
}

data = "TypeScript";
console.log(processData(data)); // 10

data = 7;
console.log(processData(data)); // 49

data = true;
console.log(processData(data)); // null

data = { a: 1 };
console.log(processData(data)); // null
