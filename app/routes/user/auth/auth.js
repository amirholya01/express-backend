const {registerValidator, loginValidator} = require("../../../validation/user/auth");
const {expressValidatorMapper} = require("../../../middleware/checkError");
const {AuthController} = require("../../../controllers/user/auth/Auth.Controller");

const router = require("express").Router();

router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register);
router.post("/login", loginValidator(), expressValidatorMapper, AuthController.login);

module.exports = {
    AuthRoutes : router
}