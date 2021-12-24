const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
    id: String,
    title: String,
    description: String,
    isCheck: Boolean,
});

const noteModel = model("note", noteSchema);

module.exports = {
    noteModel,
    noteSchema,
};
