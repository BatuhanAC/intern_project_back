const mongoose = require("mongoose")
require("dotenv").config()

 mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch((err) => {
      console.log("DB Connection ERROR" + err)
    })
