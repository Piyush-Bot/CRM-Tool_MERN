const sgMail = require("@sendgrid/mail");

const SENGRID_API_KEY =
  "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";
sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async (email, type) => {
  const msg = {
    to: email,
    from: "demosclabs@gmail.com",
    subject: "Email Verification",
    text: `localhost:3000/verifyEmail/${email}`,
  };

  sgMail.send(msg, function (err, info) {
    if (err) {
      console.log("Email Not Sent.", err);
    } else {
      console.log("Email Sent Success.");
    }
  });
};
module.exports = sendEmail;
