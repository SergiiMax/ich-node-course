import { ObjectId } from "mongodb";

export function validateId(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product ID",
    });
  }
  next();
}
