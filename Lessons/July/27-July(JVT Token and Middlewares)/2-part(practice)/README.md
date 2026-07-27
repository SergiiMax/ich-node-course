Создать сервер, функционал регистрация, логин, получение токена по логину, обязательно валидировать формате
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

Поля пользователя при регистрации - имя, фамилия, возрасти , пароль. мейл - уникальный
Получение списка всех пользователей по токену, получение одного конкретного пользователя по токену

Пароль обязательно хешировать!!! bcrypt