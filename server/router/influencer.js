const express = require("express");
const router = express.Router();
require("../db/conn");
var http = require("http");
const authenticate = require("../middleware/authenticate");
var fs = require("fs");
path = require("path");
var XLSX = require("xlsx");

router.post("/uploadDataFromExcelToDb", async (req, res) => {
  console.log("req.body", req.body);
  let filePath = req.body.fileData;
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(xlData);
  //  filePath = path.join(__dirname, "start.html");

  res.send(`file read successfull`);
});

module.exports = router;
