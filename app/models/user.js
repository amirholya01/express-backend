const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, required : true, unique : true, lowercase : true},
    email: {type : String, required : true, unique : true, lowercase : true},
    password: {type: String, required: true},
    token: {type: String, default: ""},
    roles: {type: [String], default: ["USER"]}
})

module.exports = {
    UserModel : mongoose.model("user", UserSchema)
}