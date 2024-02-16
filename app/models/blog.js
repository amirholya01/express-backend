const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    auther: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], default: []}
})

module.exports = {
    BlogModel : mongoose.model("blog", BlogSchema)
}