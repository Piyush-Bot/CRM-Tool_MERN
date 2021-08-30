const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world from server from router`);
});

//using async/ await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill rest of the fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password didn't match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //hash call here
      await user.save();
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

    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials " });
      } else {
        // need to genereate the token and stored cookie after the password match
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.json({ message: "user Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials " });
    }
  } catch (err) {
    console.log(err);
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

router.get("/getdatal", authenticate, async (req, res) => {
  //console.log(`Hello my getdata`);
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
