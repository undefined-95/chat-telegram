const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const generateToken = require('../config/generate.token');

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, pic } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      if (!name || !email || !password) {
        res.status(400).json({
          error: 'Пожалуйста заполните все поля',
        });
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        res
          .status(400)
          .json({ registrationError: 'Такой эл. адрес уже существует' });
      }

      const user = await User.create({
        name,
        email,
        password: hash,
        pic,
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
        res.status(200).json('Регистрация прошла успешно');
      }
    } catch (e) {
      res.status(400).json({
        registrationError: 'Не удалось зарегистрироваться' + e.toString(),
      });
    }
  },

  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      const valid = await bcrypt.compare(password, user.password);
      if (user && valid) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      }
    } catch (e) {
      res.status(400).json(`Не удалось авторизоватсья: ${e.toString()}`);
    }
  },
};
