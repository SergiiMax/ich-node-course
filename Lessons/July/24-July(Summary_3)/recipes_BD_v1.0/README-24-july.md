Задание продолжает инструкцию 08-june-mysql-seq. Структура проекта та же: db/connection.js, db/migrations/, db/models/, routes/, index.js. Связей между таблицами пока нет — только одна таблица recipes.

1. Развернуть проект

По шагам 1–5 из инструкции: npm init -y, "type": "module", установка express sequelize mysql2 dotenv sequelize-cli, .env, .gitignore, db/connection.js, npx sequelize-cli init.

В .env укажите свою базу — например DB_NAME=recipes_db. Саму базу создайте руками в MySQL Workbench или через CREATE DATABASE recipes_db; — Sequelize создаёт таблицы, но не базу.

2. Миграция create-recipes
bash
npx sequelize-cli migration:generate --name create-recipes

Не забудьте переименовать файл в .cjs.

Поля таблицы recipes:

Поле	Тип	Ограничения
id	INTEGER	PK, autoIncrement
name	STRING	not null
description	TEXT	nullable
instructions	TEXT	not null
cuisine	STRING(100)	nullable
difficulty	ENUM('easy','medium','hard')	not null, default 'easy' (МОЖНО СДЕЛАТЬ ПРОСТО STRING)
prepTimeMinutes	INTEGER	not null, default 0
cookTimeMinutes	INTEGER	not null, default 0
servings	INTEGER	not null, default 1
caloriesPerServing	INTEGER	nullable
imageUrl	STRING(512)	nullable (STRING пока не дойдем до AWS 3)
rating	DECIMAL(3,2)	default 0 6.7
createdAt / updatedAt	DATE	not null

Несколько пояснений, зачем именно так:

instructions — TEXT, а не STRING. STRING в Sequelize превращается в VARCHAR(255), а инструкция по приготовлению в 255 символов не влезет. Наступите на это один раз — запомните навсегда.
ENUM — база сама не даст записать difficulty: 'очень сложно'.
DECIMAL(3,2) для рейтинга, а не FLOAT. Числа с плавающей точкой дают ошибки округления, для «человеческих» значений вроде 4.75 используют DECIMAL.
default в миграции важен: если поле allowNull: false и значения по умолчанию нет, вставка без него упадёт с ошибкой.

Не забудьте down с dropTable('recipes') — миграция без отката это половина миграции.

bash
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:status

Убедитесь в Workbench, что таблица реально появилась и типы такие, как задумано.

3. Модель db/models/recipe.js

По образцу user.js из инструкции: class Recipe extends Model, Recipe.init(...), tableName: 'recipes'.

Поля в модели должны совпадать с миграцией. Это дублирование раздражает, но так устроен Sequelize: миграция меняет базу, модель описывает, как с ней работает код. Разъедутся — получите ошибку «Unknown column» в рантайме.

Добавьте в модель валидацию, которой нет в миграции:

js
servings: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 1,
  validate: { min: 1 },
},
name: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: { notEmpty: true, len: [3, 255] },
},

Разница принципиальная: ограничения из миграции проверяет MySQL, validate проверяет Sequelize в JS ещё до похода в базу. Второе даёт понятное сообщение об ошибке, первое — последний рубеж защиты.

4. Фейковые данные

Проще всего — сидер: (СКИПАЕМ ПРОПУСКАЕМ)

bash
npx sequelize-cli seed:generate --name demo-recipes
npx sequelize-cli db:seed:all

Файл тоже переименовать в .cjs. Внутри — queryInterface.bulkInsert('recipes', [...]) с 5–7 рецептами. Данные возьмите с https://dummyjson.com/recipes и захардкодьте.

Важно: в bulkInsert поля createdAt и updatedAt нужно проставить руками (new Date()), сидер не делает этого автоматически.

Кто не хочет возиться с CLI — сделайте роут POST /recipes/seed, который создаёт те же записи через Recipe.bulkCreate(). Оба варианта засчитываются.

5. Роуты routes/recipes.js

Три штуки:

GET    /recipes       — список всех рецептов
GET    /recipes/:id   — один рецепт по id
POST   /recipes       — создать рецепт

Требования:

GET /recipes/:id при отсутствии рецепта отдаёт 404 и { message: 'Recipe not found' }, а не null со статусом 200. Это самая частая ошибка в таких заданиях.
POST /recipes отдаёт 201 и созданный объект.
Каждый обработчик обёрнут в try/catch. Без него любая ошибка Sequelize (нарушение валидации, потеря соединения) уронит запрос без ответа, и клиент будет висеть до таймаута.
В catch для ошибок валидации отдавайте 400 с текстом, для остального — 500.

Подключение в index.js — как в инструкции, шаг 11.

6. Проверка
bash
http://localhost:3000/recipes
http://localhost:3000/recipes/1
http://localhost:3000/recipes/999



Отдельно проверьте, что валидация работает: отправьте POST с "servings": 0 или без name — должен прийти 400, а не 500 и не 201.

