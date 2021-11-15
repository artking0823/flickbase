const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
require("dotenv").config();

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    required: [true, "Please provide a title."]
  },
  content: {
    type: String,
    required: [true, "Please provide content."]
  },
  excerpt: {
    type: String,
    required: [true, "Please provide excerpt."],
    maxLength: 500
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  director: {
    type: String,
    required: [true, "Add director."]
  },
  actors: {
    type: [String],
    required: [true, "Add actors."],
    validate: {
      validator: function (array) {
        return array.length >= 2;
      },
      message: "Add at least 2 cast members."
    }
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "public"],
    default: "draft",
    index: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };
