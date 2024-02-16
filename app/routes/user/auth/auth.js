const {registerValidator} = require("../../../validation/user/auth");
const {expressValidatorMapper} = require("../../../middleware/checkError");
const {AuthController} = require("../../../controllers/user/auth/Auth.Controller");

const router = require("express").Router();

router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register);

module.exports = {
    AuthRoutes : router
}