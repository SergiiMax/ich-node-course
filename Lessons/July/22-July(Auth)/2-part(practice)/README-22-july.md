сделать проект на Express + Sequelize + MySQL с тремя независимыми таблицами: users, posts, comments (связей нет, postId в комментариях — просто число).

Что нужно:

три миграции + три модели;
CRUD-роуты для постов и комментариев, лайк поста через increment;
регистрация и логин пользователя с хешированием пароля через bcrypt (rounds = 10);
пароль никогда не возвращается в ответе API;
обработка ошибок: 400 при пустом теле, 404 если не найдено, 409 на дубль email;
сидер с захешированными паролями.

1. users

Поле	Тип	Ограничения
id	INTEGER	PK, autoIncrement
name	STRING	not null
email	STRING	not null, unique
password	STRING	not null

2. posts

Поле	Тип	Ограничения
id	INTEGER	PK, autoIncrement
title	STRING	not null
text	TEXT	not null
author	STRING	not null — просто имя строкой
likes	INTEGER	default 0

3. comments

Поле	Тип	Ограничения
id	INTEGER	PK, autoIncrement
postId	INTEGER	not null — обычное число, без FK
author	STRING	not null
text	TEXT	not null

На каждую таблицу — своя миграция и своя модель. createdAt / updatedAt не забываем.

подбробно
Роуты

routes/users.js

POST /users/register — { name, email, password } → 201, объект без пароля.
POST /users/login — { email, password }. Не нашли email или пароль не совпал → 401 { error: 'Неверный email или пароль' }. Успех → 200 { id, name, email }.
GET /users — список без паролей (attributes: ['id', 'name', 'email']).

routes/posts.js

GET /posts — все посты.
GET /posts/:id — один пост, если нет → 404 { error: 'Пост не найден' }.
POST /posts — создать.
PUT /posts/:id — обновить title и text.
DELETE /posts/:id — удалить, ответ 204.
POST /posts/:id/like — увеличить likes на 1 (post.increment('likes')).

routes/comments.js

GET /comments/:postId — все комментарии к посту: Comment.findAll({ where: { postId } }).
POST /comments — создать { postId, author, text }. Перед созданием проверить, что пост с таким id существует, иначе 404. (Связей нет — проверяем руками.)
DELETE /comments/:id — удалить.
Часть 3. Мелочи, которые проверю
Все роуты обёрнуты в try / catch, при ошибке — 500 с JSON, а не падение сервера.
Если тела запроса не хватает (нет title, нет email) — 400, а не 500.
Повторная регистрация на тот же email → 409 { error: 'Email уже занят' } (ловим SequelizeUniqueConstraintError).

