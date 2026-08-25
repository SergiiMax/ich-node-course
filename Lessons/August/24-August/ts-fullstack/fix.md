1. В utils/jwt.ts  ругается на JWT_SECRET который мы достаём из .env и он не уверен что не прийдёт undefined.
Решение: задать строго const JWT_SECRET = process.env.JWT_SECRET as string

2. При резистрации новоно пользователя получаем ошибку {
    "error": "Cannot destructure property 'name' of 'req.body' as it is undefined."
}
Решение: забыли app.use(express.json()) бещ него не переводится в фотмат json и мы не можем рабртать с полями

3. auth.ts передавали не токен а весть хэдэр вметре с Bearer
Решение:
const token = header.slice(7);

4. 