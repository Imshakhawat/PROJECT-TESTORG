require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes")

//express app
const app = express();

//middlewear
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method, req.cookies);
  next();
});

//routes
app.use(userRoutes);
app.use("/room",roomRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
