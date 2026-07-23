import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Определение модели Book
const Book = sequelize.define('Book', {
  // Название книги
  title: {
    type: DataTypes.STRING, // Тип данных - строка
    allowNull: false, // Поле обязательно для заполнения
  },

  // Автор книги
  author: {
    type: DataTypes.STRING, // Тип данных - строка
    allowNull: false, // Поле обязательно для заполнения
  },

  // Год издания
  year: {
    type: DataTypes.INTEGER, // Тип данных - целое число
    allowNull: false, // Поле обязательно для заполнения
  },
}, {
  // Дополнительные параметры модели
  tableName: 'Books', // Явное указание имени таблицы в базе данных
  timestamps: false, // Отключение автоматического добавления полей createdAt и updatedAt
});

export default Book;