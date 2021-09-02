const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const sendMail = require("../services/sendMail.service");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world from server from router`);
});

//emailverification
router.get("/verifyEmail/:email", async (req, res) => {
  try {
    let email = req.params.email;
    console.log(email);
    await User.findOneAndUpdate({ email: email }, { emailVerified: true });
    // res.sendFile(path.join(__dirname, "/verifyEmail.html"));
    res.send(`mail`);
  } catch (err) {
    throw err;
  }
});

//using async/ await
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

      res.status(201).json({ message: "registered successful" });
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

// about us

router.get("/about", authenticate, (req, res) => {
  //console.log(`Hello my About`);
  res.send(req.rootUser);
});
//   get user data for influencer and home page
router.get("/getdata", authenticate, (req, res) => {
  //console.log(`Hello my About`);
  res.send(req.rootUser);
});

router.get("/getdatal", async (req, res) => {
  console.log(`Hello my getdatalllllllll`);
  const users = await User.find(
    {},
    { password: 0, cpassword: 0, tokens: 0, _id: 0 }
  );
  res.status(200).json({ data: users });
  //console.log(users);
});

// logout

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(" User Logout");
});
module.exports = router;

//using promise
//  router.post('/register',  async (req, res) => {

//     const {name,email,phone,work, password ,cpassword} = req.body;

//     if(!name || !email || !phone ||!work || !password || !cpassword)
//         {
//         return res.status(422).json({error: "plz fill rest of the fields"});
//         }
//     User.findOne({ email:email })
//         .then((userExist) =>{
//             if(userExist){
//             return res.status(422).json({ error: "email already exist"  });
//             }
//             const user = new User({ name,email,phone,work,password,cpassword });

//             user.save().then(()=> {
//                 res.status(201).json({ message : "registered successful"});
//             }).catch((err) => res.status(500).json({ error : "failed to registered"}));

//     }).catch(err => { console.log(err); });
//  });
