

const { Router } = require("express");
const controller = require("../controllers/employeesController");
const { body } = require("express-validator");
const router = new Router();
const checkAuth = require("../utils/checkAuth");




router.post("/employees/create", checkAuth, [
    body('name', 'Имя должно быть минимум 2 символов').isLength({ min: 2 }),
    body('surname', 'Фамилия должно быть минимум 2 символов').isLength({ min: 3 }),
    body('aids', 'Снилс должен состоять из 11 чисел').isLength({ max: 11, min: 11 }),
    body('tin', 'ИИН должен состоять из 11 чисел').isLength({ max: 10, min: 10 }),
], controller.create);
router.get("/employees", checkAuth, controller.getAll);
router.patch(`/employees/:id`, checkAuth, controller.edit);
router.delete(`/employees/:id`, checkAuth, controller.delete);




module.exports = router;