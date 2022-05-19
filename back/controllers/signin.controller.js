const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signinController = {
  signIn: async (req, res) => {
    try {
      const { mail, password } = req.body;

      const condidate = await User.findOne({ mail });

      if (!condidate) {
        return res.status(401).json("неверный логин или пароль");
      }

      const valid = await bcrypt.compare(password, condidate.password);
      if (!valid) {
        return res.status(401).json("неверный логин или пароль(пароль)");
      }

      const payload = {
        id: condidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "21d",
      });

      res.json({
        token: token,
        id: condidate._id,
      });
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
};
