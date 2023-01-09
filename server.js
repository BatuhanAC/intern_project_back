require("express-async-error");
require("dotenv").config()
require("./src/db/dbConnection")
const express = require("express");
const app = express();
const router = require("./src/routers/auth.routes")
const port = process.env.PORT || 5000
const errorHandlerMiddleware = require("./src/middlewares/errorHandler")
const cors = require("cors")
const corsOptions = require("./src/helpers/corsOptions")

app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(cors(corsOptions))
app.use("/api", router)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});