import { ObjectId } from "mongodb";
import { getDb } from "../db/index.js";

function usersCollection() {
  return getDb().collection("users"); // обращаемся к getDB() и подтягиваем конкретную коллекцию
}

export async function createUser(req, res, next) {
  try {
    const user = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    const result = await usersCollection().insertOne(user);

    res.status(201).json({
      message: "User successfully created",
      result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(_req, res, next) {
  try {
    const users = await usersCollection().find().toArray();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const userId = new ObjectId(req.params.id);

    const user = await usersCollection().findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserById(req, res, next) {
    
}