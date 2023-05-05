const { Router } = require("express");
const controller = require("../controllers/financeController");
const router = new Router();
const checkAuth = require("../utils/checkAuth");


router.post("/finance/create", checkAuth, controller.create);
router.get("/finance",checkAuth, controller.getAll);
router.patch(`/finance/:id`, checkAuth, controller.edit);
router.delete(`/finance/delete/:id`, checkAuth, controller.delete);
router.get(`/finance/sort/:id`, checkAuth, controller.sortByName);

module.exports = router;