const Controller = require("../../Controller");
const {hashString} = require("../../../module/passwordHelper");
const {UserModel} = require("../../../models/user");
const bcrypt = require("bcrypt");
const {tokenGenerator} = require("../../../module/tokenHelper");
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
            const {username, password} = req.body;

            const user = await UserModel.findOne({username}).select('_id username password')

            if(!user) throw {status : 401, message : "The username or password is incorrect"}

            const compareResult = bcrypt.compareSync(password, user.password);

            if(!compareResult) throw {status : 401, message : "The username or password is incorrect"}

            const token = tokenGenerator(user);
            user.token = token;
            await user.save();

            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 3600000, // 1 hour
            });

            return res.status(200).json({
                status: 200,
                success: true,
                message: "You have successfully logged in to your account.",
                token
            })


        }catch (e) {
            next (e);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}