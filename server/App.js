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
app.use(require("./router/influencer"));

//for localhost
const PORT = process.env.PORT;

app.get("/signin", (req, res) => {
  res.send("hello login world from server");
});
app.get("/signup", (req, res) => {
  res.send("hello registration world from server");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
