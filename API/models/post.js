const mongoose = require("mongoose")
const luxon = require("luxon")

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    date: { type: Date, required: true },
    comments: { type: Array },
    isHidden: { type: Boolean }
}, { versionKey: false })

PostSchema.virtual("url").get(function () {
    return `/blog/${this._id}`
})
PostSchema.virtual("formattedDate").get(function () {
    return `${luxon.DateTime.fromJSDate(this.date).toLocaleString(luxon.DateTime.DATE_FULL)} ${luxon.DateTime.fromJSDate(this.date).toLocaleString(luxon.DateTime.TIME_24_SIMPLE)}`
})
PostSchema.virtual("imageBuffer").get(function () {
    if(this.image.data) {
        return this.image.data.toString('base64')
    }
    return null
})

module.exports = mongoose.model("Post", PostSchema, "posts")