1. Создайте файл `shapes.ts`:

В этом файле создайте пространство имен `Shapes`, внутри которого будут классы `Circle` и `Square` c методами для расчета площади и периметра.

2. Используйте классы из пространства имен:

Теперь, в том же файле (или в другом), создайте объекты этих классов и используйте их методы для расчета площади и периметра.

3. Проверьте результат:

Скомпилируйте код с помощью команды `tsc` и убедитесь, что всё работает корректно. Запустите скомпилированный JavaScript файл и посмотрите, правильно ли рассчитываются площади и периметры фигур.

task 2 =====================================================================

Журнал студентов
Общее правило для всех трёх задач: циклы for/while не использовать, только методы массива. any запрещён.

type Student = {
  id: number;
  name: string;
  grades: number[];
  isActive: boolean;
};

const students: Student[] = [
  { id: 1, name: 'Анна',  grades: [5, 4, 5, 5], isActive: true },
  { id: 2, name: 'Борис', grades: [3, 3, 4],    isActive: true },
  { id: 3, name: 'Вера',  grades: [4, 5, 4, 4], isActive: false },
  { id: 4, name: 'Глеб',  grades: [2, 3, 3, 4], isActive: true },
];

Реализовать:
getAverage(student: Student): number — средний балл, округлить до двух знаков
getActiveNames(students: Student[]): string[] — имена активных. 
getBestStudent(students: Student[]): Student | null — лучший по среднему баллу, на пустом массиве 
hasStudentWithoutGrades(students: Student[]): 
Проверка:

console.log(getAverage(students[0]));           // 4.75
console.log(getActiveNames(students));          // [ 'Анна', 'Борис', 'Глеб' ]
console.log(getBestStudent(students)?.name);    // Анна
console.log(hasStudentWithoutGrades(students)); // false