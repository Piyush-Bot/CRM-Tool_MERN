const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate");
const sendMail = require("../services/sendMail.service");

require("../db/conn");
const User = require("../model/userSchema");
const Influencer = require("../model/influencerSchema");
const Employee = require("../model/employeeSchema");
const Leave = require("../model/leaveSchema");

router.get("/", (req, res) => {
  res.send(`hello world from server from router`);
});

//emailverification
router.get("/verifyEmail/:email", async (req, res) => {
  try {
    let email = req.params.email;
    await User.findOneAndUpdate({ email: email }, { emailVerified: true });
    // res.sendFile(path.join(__dirname, "/verifyEmail.html"));
    res.send(`verify account from your mail`);
  } catch (err) {
    throw err;
  }
});

// logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(" User Logout");
});

//using async/ await register of user SIGN_UP
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword, type } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword || !type) {
    return res.status(422).json({ error: "plz fill rest of the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password didn't match" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
        type,
      });
      //hash call here
      await user.save();
      //mail fun.
      sendMail(email, "verification");
      res.status(201).json({ message: "Registration Successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials " });
      } else {
        // need to genereate the token and stored cookie after the password match
        if (userLogin.emailVerified) {
          token = await userLogin.generateAuthToken();
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });
          res.json({
            message: "user Signin Successfully",
            type: userLogin.type,
          });
        } else {
          throw Error("email unverified");
        }
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials " });
    }
  } catch (err) {
    throw err;
  }
});

//----------IRM_Tool & BD_Dashboard--------//
router.post("/addinfluencer", async (req, res) => {
  const {
    s_no,
    name,
    platform,
    gender,
    handle,
    genre,
    category,
    location,
    state,
    followers,
    email,
    contact_no,
  } = req.body;
  try {
    if (
      !s_no ||
      !name ||
      !platform ||
      !gender ||
      !handle ||
      !genre ||
      !category ||
      !location ||
      !state ||
      !followers ||
      !email ||
      !contact_no
    ) {
      return res.status(422).send(" missing one or more fields");
    }
    const influencer = await new Influencer({
      s_no,
      name,
      platform,
      gender,
      handle,
      genre,
      category,
      location,
      state,
      followers,
      email,
      contact_no,
    }).save();
    res.status(201).json(influencer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in saving Influencer");
  }
});

router.get("/getInfluencerlist", async (req, res) => {
  let influencer = await Influencer.find({});
  res.status(200).json({ data: influencer });
});

router.put("/getInfluencerlist/:influencerId", async (req, res) => {
  const influencerId = mongoose.Types.ObjectId(req.params.influencerId);
  const updatedInfluencer = await Influencer.updateOne(
    { _id: influencerId },
    { $set: req.body }
  );
  res.status(200).json({ data: updatedInfluencer });
});

router.delete("/deleteInfluencer/:InfluencerId", async (req, res) => {
  const InfluencerId = mongoose.Types.ObjectId(req.params.InfluencerId);

  await Influencer.findOneAndDelete({ _id: InfluencerId });
  res.status(200).json({});
});
///

//----------Employee Details---------//
router.post("/addemployee", async (req, res) => {
  const {
    email,
    accountAccess,
    firstName,
    lastName,
    phone,
    gender,
    department,
    dob,
    doj,
  } = req.body;
  try {
    if (
      !email ||
      !accountAccess ||
      !firstName ||
      !lastName ||
      !phone ||
      !gender ||
      !department ||
      !dob ||
      !doj
    ) {
      return res.status(422).send(" missing one or more fields");
    }
    const employee = await new Employee({
      email,
      accountAccess,
      firstName,
      lastName,
      phone,
      gender,
      department,
      dob,
      doj,
    }).save();
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in saving Employee");
  }
});

//getting data for table
router.get("/getEmployees", async (req, res) => {
  let employees = await Employee.find({});
  res.status(200).json({ data: employees });
});

//updating employee from table
router.put("/getEmployees/:employeeId", async (req, res) => {
  const employeeId = mongoose.Types.ObjectId(req.params.employeeId);
  const updatedEmployee = await Employee.updateOne(
    { _id: employeeId },
    { $set: req.body }
  );

  res.status(200).json({ data: updatedEmployee });
});

//deleting employee from table
router.delete("/deleteEmployees/:employeeId", async (req, res) => {
  const employeeId = mongoose.Types.ObjectId(req.params.employeeId);
  await Employee.findOneAndDelete({ _id: employeeId });
  res.status(200).json({});
});

//-----Employee Details Ends--------//

//------Leave Details-------//
router.post("/addleave", async (req, res) => {
  const { leaveType, fDate, tDate, reason, leaveStatus, name } = req.body;
  const approverId = mongoose.Types.ObjectId(req.body.approver);
  try {
    if (!leaveType || !fDate || !tDate || !reason || !leaveStatus || !name) {
      return res.status(422).send(" missing one or more fields");
    }
    const leave = await new Leave({
      leaveType,
      fDate,
      tDate,
      reason,
      leaveStatus,
      approverId,
      name,
    }).save();
    res.status(201).json(leave);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in saving Leave");
  }
});

//getting data for table
router.get("/getLeaves", async (req, res) => {
  let leaves = await Leave.find({});
  res.status(200).json({ data: leaves });
});

//making Hr as approver
router.get("/getApprover", async (req, res) => {
  let approverId = await User.find({ type: "hr" }, { _id: 1 });
  res.status(200).json({ data: approverId });
});

// Leaves for ApproverId
router.get("/getLeaves/:approverId", async (req, res) => {
  const approverId = mongoose.Types.ObjectId(req.params.approverId);
  const requiredDetailsConfig = {
    leaveType: 1,
    fDate: 1,
    tDate: 1,
    reason: 1,
    leaveStatus: 1,
  };
  let leaves = await Leave.aggregate([
    {
      $match: { approverId: approverId },
    },
    {
      $lookup: {
        from: "users",
        localField: "empId",
        foreignField: "_id",
        as: "names",
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ["$names", 0] }, "$$ROOT"] },
      },
    },
    {
      $project: {
        names: 0,
        approverId: 0,
        cpassword: 0,
        email: 0,
        emailVerified: 0,
        empId: 0,
        password: 0,
        phone: 0,
        type: 0,
        work: 0,
        tokens: 0,
        _v: 0,
      },
    },
  ]);
  res.status(200).json({ data: leaves });
});

//
router.put("/updateLeaves/:leaveId", async (req, res) => {
  // approveId and empId will be used after HR login page implementation
  const { empId, approverId, status } = req.body;
  const leaveId = mongoose.Types.ObjectId(req.params.leaveId);
  let leaves = await Leave.updateOne(
    { _id: leaveId },
    {
      $set: { leaveStatus: status },
    }
  );
  res.status(200).json({ data: leaves });
});

//-------Leave Details Ends-----//

//get user data for influencer and home page
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// console.log(`User list`);
router.get("/displayaUserlist", async (req, res) => {
  const users = await User.find(
    {},
    { password: 0, cpassword: 0, tokens: 0, _id: 0 }
  );
  res.status(200).json({ data: users });
});

module.exports = router;
