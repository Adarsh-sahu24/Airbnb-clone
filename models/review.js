const { string, date } = require("joi");
const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const reviewShema = new Schema ({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongooes.model("Review",reviewShema);