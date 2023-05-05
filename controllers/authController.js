const bcrypt = require("bcryptjs");
const User = require("../models/authUserModel");
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            
            const { name, email, password } = req.body;

            const candidate = await User.findOne({ email });
            if (candidate) return res.status(400).json({ message: "Пользователь с такой почтой уже существует" });
            const hashPassword = await bcrypt.hash(password, 7);
            const user = new User({
                name,
                email,
                password: hashPassword,
            })

            await user.save();

            const token = jwt.sign({
                _id: user._id,
            }, process.env.JWT_SECRET,
                {
                    expiresIn: '30d',
                }
            )
            return res.json({
                user,
                token,
            });
        } catch (e) {
            console.log(e);
        }
    }
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Пользователь с такой почтой не найден" })
            }
            const isValidPass = await bcrypt.compareSync(password, user.password);
            if (!isValidPass) {
                return res.status(400).json({ message: "Неверный логин или пароль" })
            }
            const token = jwt.sign({
                _id: user._id,
            }, process.env.JWT_SECRET,
                {
                    expiresIn: '30d',
                }
            );

            return res.json({user, token});
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();