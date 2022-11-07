const mongoose = require("mongoose");
const valid = require("validator");

const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a valid name"],
      trim: true,
      minLength: [3, "Name must be at least 3 character"],
      maxLength: [100, "Name can't be greater than 100 character"],
    },
    location: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
      validate: [valid.isURL, "Wrong url"],
    },
    designation: {
      type: String,
      required: true,
      enum: {
        values: ["web developer", "app developer", "mern developer"],
        message: "designation can't be {Value}, must web, app, mern",
      },
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = new mongoose.model("Job", jobSchema);

module.exports = Job;
