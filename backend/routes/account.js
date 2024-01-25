const { Router } = require("express");
const { authMiddleware } = require("./middleware");
const {Accounts} = require("../db");
const { default: mongoose } = require("mongoose");
const { transformer } = require("zod");

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const data = await Accounts.findOne({
        userId: req.userId
    })
    res.json({
        balance: data.balance
    });
})


accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    let {amount, to} = req.body;
    amount = parseInt(amount);
    const session = await mongoose.startSession();

    session.startTransaction();
    const acccountData = await Accounts.findOne({
        userId: req.userId
    }).session(session);

    console.log(acccountData, amount, acccountData.balance)

    //if user not present, or insufficient balance, abort the transaction

    if(!acccountData || amount > (acccountData.balance)){
        await session.abortTransaction();
        return res.status(400).json(
            {
                message: "Insufficient balance"
            }
        )
    }

    //checking if the user to transfer to exists or not
    const toAccountData = await Accounts.findOne({
        userId: to
    }).session(session);


    if(!toAccountData){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    //incrementing the already present values inside of the database. `$inc command`
    await Accounts.updateOne({userId: req.userId}, {$inc: {balance : -amount}}).session(session);
    await Accounts.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    //COMMIT THE TRANSACTION
    await session.commitTransaction();
    res.status(200).json({
        message: "Transaction successful"
    })
    
})

module.exports = accountRouter;