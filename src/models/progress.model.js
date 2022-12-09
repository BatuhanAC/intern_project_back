const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    trim: true
  },
  values: [
    {
      neck: {
        type: Number,
        required: true,
        trim: true
      },
      chest: {
        type: Number,
        required: true,
        trim: true
      },
      waist: {
        type: Number,
        required: true,
        trim: true
      },
      hip: {
        type: Number,
        required: true,
        trim: true
      },
      arm: {
        type: Number,
        required: true,
        trim: true
      },
      weight: {
        type: Number,
        required: true,
        trim: true
      },
      fat: {
        type: Number,
        required: true,
        trim: true
      },
      date: {
        type: Number,
        required: true,
        trim: true
      },
      day: {
        type: Number,
        required: true,
        trim: true
      }
    }
  ]
}, {collection: "progress", timestamps: true})

const progress = mongoose.model("progress", progressSchema)

module.exports = progress