function checkFields(data) {
  const errors = [];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Простая регулярка для email: что-то@что-то.что-то const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim() === "") {
      errors.push("Name must be a non-empty string");
    }
  }

  if (data.email !== undefined) {
    if (typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
      errors.push("Email has invalid format");
    }
  }

  if (data.age !== undefined) {
    if (!Number.isInteger(data.age) || data.age < 0 || data.age > 125) {
      errors.push("Age must be an integer from 0 to 125");
    }
  }

  return errors;
}

export function validateCreateUser(req, res, next) {
  const { name, email, age } = req.body || {};

  if (!name || !email || !age) {
    return res.status(400).json({
      message: "Name and Email are required",
    });
  }

  const errors = checkFields({ name, email, age })

  if (errors.length > 0) {
    return res.status(400).json({
        error: "Validation failed",
        details: errors,
    })
  }

  req.body = { name, email, age }

  next();
}
