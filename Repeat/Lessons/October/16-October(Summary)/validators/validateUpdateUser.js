const ALLOWED_FIELDS = ["name", "email", "age"];

function checkFields(data) {
  const errors = [];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function validateUpdateUser(req, res, next) {
  const data = req.body || {};
  const { name, email, age } = data;

//   if (Object.keys(data).length === 0) {
//     return res.status(400).json({
//       error: `Nothing to update. Allowed fields: ${ALLOWED_FIELDS.join(", ")}`,
//     });
//   }

// такой вариант получше...наверное))
const hasAllowed = ALLOWED_FIELDS.some((field) => data[field] !== undefined);

if (!hasAllowed) {
  return res.status(400).json({
    error: `Nothing to update. Allowed fields: ${ALLOWED_FIELDS.join(", ")}`,
  });
}


  const errors = checkFields({ name, email, age });

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  req.body = Object.fromEntries(
    ALLOWED_FIELDS.filter((field) => data[field] !== undefined).map((field) => [
      field,
      data[field],
    ]),
  );

  next();
}
