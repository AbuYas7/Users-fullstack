const User = require("../models/User.model");
const bcrypt = require("bcrypt");

module.exports.usersController = {
  signupUser: async (req, res) => {
    const { name, mail, password, birthday, gender } = req.body;

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
    try {
      const user = await User.create({
        name,
        mail,
        password: hash,
        birthday,
        gender,
        image: req.file ? req.file.path : "",
      });
      res.json(user);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  patchUser: async (req, res) => {
    try {
      const json = await User.findOne({ _id: req.user.id });
      const name = req.body.name ? req.body.name : json.name;
      const password = req.body.password ? req.body.password : json.password;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          password: hash,
        }
      );
      const user = await User.findOne({ _id: req.user.id });
      res.json(user);
    } catch (error) {
      res.status(401).json("Ошибка " + toString());
    }
  },

  changeImage: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          image: req.file.path,
        }
      );
      res.json(user);
    } catch (error) {
      res.status(401).json("Ошибка" + error.toString());
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
