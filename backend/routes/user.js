const express = require("express")
const userRouter = express.Router();
const JWT_SECRET = require("../config");
const {User, Accounts} = require("../db.js")
const {authMiddleware, signInValidator, signUpValidator, updationValidator} = require("./middleware.js");
const jwt = require("jsonwebtoken");

userRouter.get("/dashboard", authMiddleware, async (req, res) => {
    let userObject = await User.findOne(
        {
            _id: req.userId
        }
    )
    console.log(userObject);
    userObject.password = null;
    res.json(userObject)
})

userRouter.post("/signup", signUpValidator, async (req, res) => {
    const existingUser = await User.findOne({username: req.body.username});
    console.log(existingUser)
    if(existingUser != null){
        res.status(411).send("user already present");
    }
    else{
        const user = await User.create(({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }));
        const userId = user._id;
        const token = jwt.sign({userId: userId}, JWT_SECRET)
        //there's no need for us to store the jwt, it can be always reverified from the user header tags
        const account = await Accounts.create({
            userId: userId,
            balance: Math.floor(1 + Math.random()*10000)
        });
        res.status(200).json({
            userId : token
        })
    }
})

userRouter.post("/signin", signInValidator, async (req, res) => {
    const userData = await User.findOne({username: req.body.username, password: req.body.password});
    if(!userData){
        res.status(411).send("Error while logging in")
        return;
    }
    const token = jwt.sign({userId : userData._id}, JWT_SECRET);
    res.status(200).json({
        token: token
    });
})

userRouter.put("", authMiddleware, updationValidator , async (req, res) => {
    const userData = await User.updateOne({ _id : req.userId }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    console.log(userData)
    res.json({
        message: "updated"
    })
})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [
            {
                firstName: {
                    "$regex" : filter
                }
            },  
            {
                lastName:  {
                    "$regex" : filter
                }
            }
        ]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

    /*
    Another way
    const users = await User.find().or([
        {firstName : filter},
        {lastName: filter}
    ])
    */
})

module.exports = userRouter;