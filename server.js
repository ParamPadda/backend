const express = require("express");
const app = express();
const cors = require("cors");
// const AuthRouter = require("./routes/api/AuthRouter");
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./models/db");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//middlewares
app.use( cors());
// app.use(bodyParser.json());



// app.use("/auth", AuthRouter);
app.use(routes);


app.get("/", (req, res) => {
  res.send("Welcome to port 8080");
  res.json({ success: "true", message: "successful request" });
});

app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}`);
});
