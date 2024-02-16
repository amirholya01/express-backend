const {body} = require("express-validator");
const {UserModel} = require("../../models/user");

function registerValidator(){
    return[
        body("username").custom(async (value, ctx)=> {
            if(value){
                const userRegex = /^[a-z]+[a-z0-9]{3,}/gi

                if (userRegex.test(value)){
                    const user = await UserModel.findOne({username: value});
                    if(user) throw "The username was duplicated"
                    return true;
                }
                return "This username was not allowed"
            }
            else {
                throw "The username can not be empty"
            }
        }),
        body("email").isEmail().withMessage("This email was not allowed")
            .custom(async email => {
                const user = await UserModel.findOne({email})
                if(user) throw "The email was used before";
                return true;
            }),
        body("password").isLength({min: 6, max: 16}).custom((value, ctx) => {
            if(!value) throw "The password can not be empty";
            return true;
        })
    ]
}

function loginValidator(){

    // Define validation rules using express-validator middleware
    return [
        body("username").notEmpty().withMessage("username can not be empty")

            .custom(username => {
                const usernameRegex = /^[a-z]+[a-z0-9]{3,}/gi
                if(usernameRegex.test(username)){
                    return true
                }
                throw "wrong user name, please try again"
            }),

        body("password").isLength({min : 6, max : 16}).withMessage("The password should at least be between 6 and 16 characters")
    ]

}


module.exports = {
    registerValidator,
    loginValidator
}