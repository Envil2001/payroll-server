const Employees = require("../models/EmployeesModels");
const Finance = require("../models/FinanceModel");
const { validationResult } = require("express-validator");



class EmployeesControllers {
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const { name, surname, salary, dateofbirth, aids, tin, sex } = req.body;
        try {
            const doc = new Employees({
                name,
                surname,
                salary,
                dateofbirth,
                aids,
                tin,
                sex,
                user: req.userId,
            });

            const employ = await doc.save();
            const employWithUser = await Employees.findById(employ._id).populate('user');
            return res.status(200).json(employWithUser);
        } catch (e) {
            console.log(e);
        }
    }
    async getAll(req, res) {
        try {
            const employees = await Employees.find({ user: req.userId }).populate('user');
            res.status(200).json(employees);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    async delete(req, res) {
        try {
            const payroll = await Employees.findByIdAndDelete(req.params.id);

            await Finance.deleteMany({ employee: { _id: req.params.id } });
            res.json(payroll);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async edit(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const { name, surname, salary, dateofbirth, aids, tin, sex } = req.body;
        try {
            const payroll = await Employees.findByIdAndUpdate(req.params.id,
                {
                    name,
                    surname,
                    salary,
                    dateofbirth,
                    aids,
                    tin,
                    sex,
                    user: req.userId,
                },
                {
                    new: true,
                });
            res.json(payroll);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new EmployeesControllers();