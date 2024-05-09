const express = require("express")
const app = express()
const router = express.Router()
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const mongoose = require("mongoose");
const cors = require("cors")
const { swaggerUi, specs } = require("./swagger");
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
require("./routes/user.route")(router)
require("./routes/upload.route")(router)
app.use(`/api/`, router);
app.use(`/healthCheck`, (req, res) => res.send("Helth check"));

app.listen(port, () => {
  connectDB(mongoose)
  console.log(`Server running at:${port}`)
})