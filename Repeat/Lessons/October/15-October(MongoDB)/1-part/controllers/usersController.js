import { getDb } from "../db/index.js";

function usersCollection() {
    return getDb().collection('users') // обращаемся к getDB() и подтягиваем конкретную коллекцию
}

export async function createUser(req, res, next) {
    try {
        const user = {
            ...req.body,
            createdAt: new Date().toISOString()
        }
        const result = await usersCollection().insertOne(user)

        res.status(201).json({
            message: 'User successfully created',
            result
        })
    } catch (error) {
        next(error)
    }
}
