// task1

function fetchStep1(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Шаг 1 завершен"), 1000);
  });
}
function fetchStep2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Шаг 2 завершен"), 2000);
  });
}
function fetchStep3(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Шаг 3 завершен"), 3000);
  });
}

async function allStepsRun() {
    const step1 = await fetchStep1()
    console.log(step1);
    const step2 = await fetchStep2()
    console.log(step2);
    const step3 = await fetchStep3()
    console.log(step3);
}

allStepsRun()

// task2

function processString(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str.toUpperCase())
    }, 1000);
  });
}


async function processArrayParallel(arr: string[]): Promise<void> {
  const promises = arr.map((item) => processString(item));
  const results = await Promise.all(promises);

  console.log('Результат параллельной обработки:', results);
}

processArrayParallel(['hello', 'typescript', 'async']);

// task3

function fetchTask1(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Результат 1"), 1000);
  });
}
function fetchTask2(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Ошибка в Task 2!"), 2000);
  });
}
function fetchTask3(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Результат 3"), 3000);
  });
}

async function runParallelWithError(): Promise<void> {
    try {
        await Promise.all([fetchTask1(), fetchTask2(), fetchTask3()])
    } catch (error) {
        console.error("Error: ", error)
    }
}

runParallelWithError()

// task4

const numbers = [2000, 3000, 1000];



async function processDynamicDelays(numbers: number[]): Promise<void> {
const promises = numbers.map((ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Готово через ${ms} мс`);
    }, ms);
  });
});
const result = await Promise.all(promises)
console.log(result);
}

processDynamicDelays(numbers)