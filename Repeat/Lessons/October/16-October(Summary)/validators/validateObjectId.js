import { ObjectId } from "mongodb";

export function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
        error: 'Invalid user ID'
    })
  }
  next()
}
