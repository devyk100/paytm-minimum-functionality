const express = require("express")
const accountRouter = require("./account.js");
const userRouter = require("./user.js");
// const app = express();

const router = express.Router();

router.use("/user", userRouter);

router.use("/account", accountRouter);


module.exports = {
    router
}