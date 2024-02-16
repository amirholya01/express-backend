const {HomeController} = require("../../controllers/api/Home.Controller");
const router = require("express").Router();

router.get("/", HomeController.indexPage);

module.exports = {
    IndexRoutes : router
}