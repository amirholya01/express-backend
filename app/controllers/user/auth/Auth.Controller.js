const Controller = require("../../Controller");
const {hashString} = require("../../../module/passwordHelper");
const {UserModel} = require("../../../models/user");

class AuthController extends  Controller{
    async register(req, res, next){
        try {
            const {username, password, confirmPassword, email} = req.body;
            const hash_Password = hashString(password);
            const user = await UserModel.create({username, password: hash_Password, confirmPassword, email})
                .catch(err => {
                    if(err?.code === 11000){
                        throw {status: 400, message: "The username already has used"}
                    }
                })
            return res.json(user);
        }catch (e) {
            next(e);
        }
    }

    async login(req, res, next){
        try {

        }catch (e) {
            next (e);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}