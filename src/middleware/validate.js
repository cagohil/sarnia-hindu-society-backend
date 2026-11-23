import { validationResult } from "express-validator";

// Runs after express-validator chains; returns 400 with the errors if any failed.
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};
