import type { Student } from "./types"

const students: Student[] = [
  { id: 1, name: 'Анна',  grades: [5, 4, 5, 5], isActive: true },
  { id: 2, name: 'Борис', grades: [3, 3, 4],    isActive: true },
  { id: 3, name: 'Вера',  grades: [4, 5, 4, 4], isActive: false },
  { id: 4, name: 'Глеб',  grades: [2, 3, 3, 4], isActive: true },
];

const getAverage = (student: Student): number => {
    const avgGrades = student.grades.reduce((acc, cur) => acc + cur, 0) / student.grades.length
    return Math.round(avgGrades * 100) / 100
}

console.log(getAverage(students[0]!));

const getActiveNames = (students: Student[]): string[] => {
    return students.filter(student => student.isActive).map(student => student.name)
}

console.log(getActiveNames(students));

const getBestStudent = (students: Student[]): Student | null => {
    return students.reduce((best, student) => getAverage(student) > getAverage(best) ? student : best)
}

console.log(getBestStudent(students)?.name);