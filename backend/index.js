const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const authUser = require("./routes/user");
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connected to db.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/auth", authRoute);
app.use("/users", authUser);
app.listen("5000", () => {
    console.log("backend running");
});