const Controller = require("../Controller");

class HomeController extends Controller{
    indexPage(req, res, next){
        try {
            return res.status(200).json({
                statusCode: 200,
                message: "Welcome to home page...."
            })
        }catch (e) {
            next(e);
        }
    }
}

module.exports = {
    HomeController : new HomeController()
}