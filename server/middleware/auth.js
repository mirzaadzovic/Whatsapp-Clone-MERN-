import config from "config";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.cookies.wat;
  console.log(token);

  try {
    // Check token
    if (!token) {
      res.clearCookie("wat");
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    // Verify token
    jwt.verify(token, config.get("secretKey"), (err, user) => {
      if (err) {
        res.clearCookie("wat");
        return res.status(403).json({ errorMessage: "Forbidden" });
      }

      // Add user from payload
      req.user = user;
      next();
    });
  } catch (e) {
    res.status(400).json({ errorMessage: "Token not valid" });
    res.clearCookie("wat");
  }
};

export default auth;
