const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema(
  {
    name: { type: String },
    time: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", Movie);
