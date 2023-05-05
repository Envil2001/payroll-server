const Finance = require("../models/FinanceModel");

class FinanceController {
    async create(req, res) {
        const { date, premius, fines, role, awards, employee } = req.body;
        try {
            const doc = new Finance({
                date,
                premius,
                role,
                fines,
                awards,
                employee,
                user: req.userId,
            });

            const finance = await doc.save();
            const financeWithUser = await Finance.findById(finance._id).populate(['employee', 'user']);

            
            return res.status(200).json(financeWithUser);
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const employees = await Finance.find({ user: req.userId }).populate(['employee', 'user']);
            res.status(200).json(employees);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    async delete(req, res) {
        try {
            const payroll = await Finance.findByIdAndDelete(req.params.id);
            res.json(payroll);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async edit(req, res) {

        const { date, premius, fines, role, awards, employee } = req.body;
        try {
            const payroll = await Finance.findByIdAndUpdate(req.params.id,
                {
                    date,
                    premius,
                    fines,
                    role,
                    awards,
                    employee
                },
            );
            return res.json(payroll);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async sortByName(req, res) {
        try {
            const financeUser = await Finance.find({employee: req.params.id}).populate(['employee', 'user']);
            return res.json(financeUser);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new FinanceController();