const JWT_SECRET = require("../config.js");
const jwt = require("jsonwebtoken")
const z = require("zod");

const updationDataSchema = z.object({
    firstName : z.string().optional(),
    lastName : z.string().optional(),
    password : z.string().min(9).optional()
})

const signUpDataObject = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8)
})

const signInObject = z.object({
    username: z.string().email(),
    password: z.string().min(8)
})

const signUpValidator = (req, res, next) => {
    const userData = req.body;
    const {success, error} = signUpDataObject.safeParse(userData);
    if(success){
        next();
    }
    else{
        res.status(411).send("Wrong inputs", error);
    }
}

const signInValidator = (res, req, next) => {
    const userData = res.body;
    const {success, error} = signInObject.safeParse(userData);
    if(success){
        next();
    }
    else{
        res.status(411).send("Wrong inputs");
    }
}

const authMiddleware = (req, res, next) => {
    let authData;
    try{
        const auth = req.headers.authorization;
        console.log(auth)
        authData = auth.split(" ");
    }
    catch(error){
        console.log("dwd")
        res.json({
            message: "sign in first"
        })
        return;
    }
    if(authData[0] != "Bearer"){
        console.log("ERROR")
        res.status(403).send()
    }
    try{
        console.log(authData[1]);
        const data = jwt.verify(authData[1], JWT_SECRET);
        req.userId = data.userId;    
        console.log(data)
        next();
    }
    catch(e){
        res.status(403).send("Not signed in");
    }
}

const updationValidator = (req, res, next) => {
    const {success} = updationDataSchema.safeParse({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    if(!success){
        res.status(403).send("some error")
        return;
    }
    next();

}  

module.exports = {authMiddleware, signInValidator, signUpValidator, updationValidator};