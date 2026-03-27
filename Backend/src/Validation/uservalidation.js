export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters" });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email required" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  next();
};