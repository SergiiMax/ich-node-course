function checkFields(data) {
  const errors = [];

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim() === "") {
      errors.push("Name must be a non-empty string");
    }
  }

  if (data.price !== undefined) {
    if (
      !Number.isFinite(data.price) ||
      data.price <= 0 ||
      data.price > 1000000
    ) {
      errors.push("Price must be a positive number up to 1 000 000");
    }
  }

  if (data.description !== undefined) {
    if (
      typeof data.description !== "string" ||
      data.description.trim().length > 500
    ) {
      errors.push("Description must be a string up to 500 characters");
    }
  }

  return errors;
}

export function validateCreateProduct(req, res, next) {
  const { name, price, description } = req.body || {};

  if (!name || price === undefined) {
    return res.status(400).json({
      message: "Name and Price are required",
    });
  }

  const errors = checkFields({ name, price, description });

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  const product = { name: name.trim(), price };

  if (description !== undefined) {
    product.description = description.trim();
  }

  req.body = product;
  next();
}
