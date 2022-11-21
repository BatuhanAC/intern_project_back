require("dotenv").config()
require("./src/db/dbConnection")
const express = require("express");
const app = express();
const router = require("./src/routers/auth.routes")
const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});

app.get("/", (req, res) => {
  res.json({
    message: "Anasayfa Geldi"
  })
})

app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use("/api", router)


