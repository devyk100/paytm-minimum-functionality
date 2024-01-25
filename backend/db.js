const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://admin:JkPjuICqRuOTQhuo@cluster0.yr0favp.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

/* Better one.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});
*/


const accountSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance : {
        type : Number,
        required: true
    }
})

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountSchema);

module.exports = {
    User, Accounts
}