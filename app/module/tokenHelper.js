const jwt = require("jsonwebtoken");

function tokenGenerator(user){

    const payload = {
        _id: user._id,
        username: user.username
    };

    const token = jwt.sign(
        payload,

        process.env.SECRET_KEY,
        {expiresIn: process.env.EXPIRE_IN}
    );
    return token;
}


module.exports = {
    tokenGenerator
}