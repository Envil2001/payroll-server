require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5566 ;

const authRouter = require("./routers/authRouter")
const employeesRouter = require("./routers/employeesRotuer");
const financeRouter = require("./routers/financeRouter");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use("/auth", authRouter);
app.use("/api", employeesRouter);
app.use("/fina", financeRouter);
app.use("/", (req, res) => {
    res.send('Welcome to homepage')
})

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DATABASE CONNECTED"))
        .catch(() => console.log("DATABASE ERROR"));
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch(e) {
        console.log(e)
    }
}

start();