const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    image: {type: String, required: true},
})

module.exports = {
    SliderModel : mongoose.model("slider", SliderSchema)
}