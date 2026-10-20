export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  if (err.code === 11000) {
    return res
      .status(409)
      .json({ message: "Duplicate value", fields: err.keyValue });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
}
