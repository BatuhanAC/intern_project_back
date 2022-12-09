const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  amount: [
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      carbonhydrate: {
        type: Number,
        required: true,
        trim: true
      },
      protein: {
        type: Number,
        required: true,
        trim: true
      },
      fat: {
        type: Number,
        required: true,
        trim: true
      },
      calorie: {
        type: Number,
        required: true,
        trim: true
      },
    }
  ]
}, {collection: "foods", timestamps: true})

const food = mongoose.model("foods", foodSchema)

module.exports = food