const jwt = require("jsonwebtoken");

const genrateJwtToken = async (email) => {
  const secretKey = process.env.secretkey;

  if (!email) {
    return "payload required";
  }

  const token = jwt.sign({ email }, secretKey, { expiresIn: "24h" });
  return token;
};

module.exports = { genrateJwtToken };
