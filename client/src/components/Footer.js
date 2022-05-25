import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import logoImage from "../images/logo_full.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          display: "flex",
          flexDirection: "row",
          py: 1,
          px: 2,
          mt: "auto",
          backgroundColor: "whitesmoke",
        }}
      >
        <img
          src={logoImage}
          alt="login logo"
          width="120"
          height="auto !important"
        />
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
}

// import React from "react";
// import "./css/Footer.css";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <>
//       <div className="footer-container">
//         <section className="footer-subscription">
//           <p className="footer-subscription-heading">
//             Join the Scroll Labs and become an Influencer
//           </p>

//           <div className="input-areas">
//             <button>Register</button>
//           </div>
//         </section>
//         {/* <div className="footer-links">
//           <div className="footer-link-wrapper">
//             <div className="footer-link-items">
//               <h2>About Us</h2>
//               <Link to="/sign-up">How it works</Link>
//               <Link to="/">Careers</Link>
//               <Link to="/">Investors</Link>
//               <Link to="/">Terms of Service</Link>
//             </div>
//             <div className="footer-link-items">
//               <h2>Contact Us</h2>
//               <Link to="/">Contact</Link>
//               <Link to="/">Support</Link>
//               <Link to="/">Sponsorships</Link>
//             </div>
//           </div>
//           <div className="footer-link-wrapper">
//             <div className="footer-link-items">
//               <h2>Videos</h2>
//               <Link to="/">Submit Video</Link>
//               <Link to="/">Agency</Link>
//               <Link to="/">Influencer</Link>
//             </div>
//             <div className="footer-link-items">
//               <h2>Social Media</h2>
//               <Link to="/">Instagram</Link>
//               <Link to="/">Facebook</Link>
//               <Link to="/">Youtube</Link>
//               <Link to="/">Twitter</Link>
//             </div>
//           </div>
//         </div> */}
//         <section className="social-media">
//           <div className="social-media-wrap">
//             <div className="footer-logo">
//               <Link to="/" className="social-logo">
//                 Scroll labs
//                 {/* <i className="zmdi zmdi-camera" /> */}
//               </Link>
//             </div>
//             {/* <small className="website-rights">Social Media</small> */}
//             <div className="social-icons">
//               <Link
//                 className="social-icon-link facebook"
//                 to="//www.facebook.com/LaudcoMedia"
//                 target="_blank"
//                 aria-label="Facebook"
//               >
//                 <i className="zmdi zmdi-facebook-box" />
//               </Link>

//               <Link
//                 className="social-icon-link instagram"
//                 to="//www.instagram.com/laudcomedia/"
//                 target="_blank"
//                 aria-label="Instagram"
//               >
//                 <i className="zmdi zmdi-instagram" />
//               </Link>

//               <Link
//                 className="social-icon-link twitter"
//                 to="//twitter.com/laudcomedia"
//                 target="_blank"
//                 aria-label="Twitter"
//               >
//                 <i className="zmdi zmdi-twitter-box" />
//               </Link>

//               <Link
//                 className="social-icon-link linkedin"
//                 to="//www.linkedin.com/company/laudco-media/mycompany/"
//                 target="blank"
//                 aria-label="LinkedIn"
//               >
//                 <i className="zmdi zmdi-linkedin-box" />
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Footer;
