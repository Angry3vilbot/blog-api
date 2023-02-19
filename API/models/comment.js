const mongoose = require("mongoose")
const luxon = require("luxon")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
}, { versionKey: false })

CommentSchema.virtual("formattedDate").get(function () {
    return `${luxon.DateTime.fromJSDate(this.date).toLocaleString(luxon.DateTime.DATE_FULL)} ${luxon.DateTime.fromJSDate(this.date).toLocaleString(luxon.DateTime.TIME_24_SIMPLE)}`
})

module.exports = mongoose.model("Comment", CommentSchema, "comments")