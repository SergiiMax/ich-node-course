"use strict";
// Создание и использование интерфейса для описания задачи
// 1.Создайте интерфейс `Task`, который описывает задачу с полями `title`, `description` и `isCompleted`.
// 2.Напишите функцию, которая принимает массив задач и выводит только невыполненные задачи.
function uncompletedTasks(task) {
    console.log(task.filter((item) => item.isCompleted === false));
}
const arrTask = [
    {
        title: "Поход в кино",
        description: "Иду в кино с семьёй",
        isCompleted: true,
    },
    {
        title: "Шоппинг",
        description: "Иду покупать одежду",
        isCompleted: false,
    },
    {
        title: "Пообедать",
        description: "Обед с семьёй",
        isCompleted: false,
    },
    {
        title: "ужин",
        description: "ужин с семьёй",
        isCompleted: true,
    },
];
uncompletedTasks(arrTask);
//# sourceMappingURL=task6.js.map