import config from "config";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.cookies.wat;
  console.log(token);

  try {
    // Check token
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    // Verify token
    jwt.verify(token, config.get("secretKey"), (err, user) => {
      if (err) return res.status(403).json({ errorMessage: "Forbidden" });
      console.log(user);

      // Add user from payload
      req.user = user;
      next();
    });
  } catch (e) {
    res.status(400).json({ errorMessage: "Token not valid" });
  }
};

export default auth;
