const { Router } = require("express");
const controller = require("../controllers/authController");
const { body } = require("express-validator");

const router = new Router();

router.post("/registration", [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('name', 'Укажите имя').isLength({ min: 3 })
], controller.registration);
router.post("/login", [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
], controller.login);


module.exports = router;