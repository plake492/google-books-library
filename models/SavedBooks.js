const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedBooksSchema = new Schema({
  authors: { type: String },
  description: { type: String },
  image: { type: String },
  link: { type: String },
  title: { type: String, required: true }
});

const SavedBooks = mongoose.model("SavedBooks", savedBooksSchema);

module.exports = SavedBooks;
