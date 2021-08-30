const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
// const User = require('./model/userSchema');

app.use(express.json());
// link of router
app.use(require("./router/auth"));

//for localhost
const PORT = process.env.PORT;

// app.get("/about", (req, res) => {
//   res.send("hello about world from server");
// });
app.get("/contact", (req, res) => {
  res.cookie("test", "piyush");
  res.send("hello contact world from server");
});
app.get("/signin", (req, res) => {
  res.send("hello login world from server");
});
app.get("/signup", (req, res) => {
  res.send("hello registration world from server");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
