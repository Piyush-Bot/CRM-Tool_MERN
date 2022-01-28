const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

// const SENGRID_API_KEY =
//   "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";
// sgMail.setApiKey(SENGRID_API_KEY);

// const sendEmail = async (email, type) => {
//   const msg = {
//     to: email,
//     from: "demosclabs@gmail.com",
//     subject: "Email Verification",
//     text: `localhost:3000/verifyEmail/${email}`,
//   };

//   sgMail.send(msg, function (err, info) {
//     if (err) {
//       console.log("Email Not Sent.", err);
//     } else {
//       console.log("Email Sent Success.");
//     }
//   });
// };

const sendEmail = async (email, type) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    console.log("testAccount----", testAccount);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    console.log("transporter-----", transporter);

    let link = `localhost:3000/verifyEmail/${email}`;
    const newHtmlTemplate = `
        
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Email Verified</title>
    <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
        *:not(br):not(tr):not(html) {
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            line-height: 1.4;
            background-color: #F5F7F9;
            color: #839197;
            -webkit-text-size-adjust: none;
        }
        a {
            color: #0082DF;
        }

        /* Layout ------------------------------ */
        .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #F5F7F9;
        }
        .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        /* Masthead ----------------------- */
        .email-masthead {
            padding: 25px 0;
            text-align: center;
        }
        .email-masthead_logo {
            max-width: 400px;
            border: 0;
        }
        .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #839197;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
        }

        /* Body ------------------------------ */
        .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            border-top: 1px solid #E7EAEC;
            border-bottom: 1px solid #E7EAEC;
            background-color: #FFFFFF;
        }
        .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
        }
        .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            text-align: center;
        }
        .email-footer p {
            color: #839197;
        }
        .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            text-align: center;
        }
        .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #E7EAEC;
        }
        .content-cell {
            padding: 35px;
        }
        .align-right {
            text-align: right;
        }

        /* Type ------------------------------ */
        h1 {
            margin-top: 0;
            color: #292E31;
            font-size: 19px;
            font-weight: bold;
            text-align: left;
        }
        h2 {
            margin-top: 0;
            color: #292E31;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
        }
        h3 {
            margin-top: 0;
            color: #292E31;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }
        p {
            margin-top: 0;
            color: #839197;
            font-size: 16px;
            line-height: 1.5em;
            text-align: left;
        }
        p.sub {
            font-size: 12px;
        }
        p.center {
            text-align: center;
        }

        /* Buttons ------------------------------ */
        .button {
            display: inline-block;
            width: 200px;
            background-color: #0095d4;
            border-radius: 3px;
            color: #ffffff;
            font-size: 15px;
            line-height: 45px;
            text-align: center;
            text-decoration: none;
            -webkit-text-size-adjust: none;
            mso-hide: all;
        }
        .button--green {
            background-color: #28DB67;
        }
        .button--red {
            background-color: #FF3665;
        }
        .button--blue {
            background-color: #0082DF;
        }

        /*Media Queries ------------------------------ */
        @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
        }
        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
    </style>
</head>
<body>
<table className="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">
            <table className="email-content" width="100%" cellpadding="0" cellspacing="0" align="center">
                <!-- Logo -->
                <tr>
                    <!--                    <td>-->
                    <img src="">
                    <!--                    </td>-->

                </tr>
                <!-- Email Body -->
                <tr>
                    <td className="email-body" width="100%">
                        <table className="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                            <!-- Body content -->
                            <tr>
                                <td className="content-cell">
                                    <h1>Verify your email address</h1>
                                    <p>Thanks for signing up for Vyb! We're excited to have you as user.</p>
                                    <!-- Action -->
                                    <table className="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center">
                                                <div>
                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{action_url}}" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="7%" stroke="f" fill="t">
                                                    <v:fill type="tile" color="#414EF9" />
                                                    <w:anchorlock/>
                                                    <center style="color:#ffffff;font-family:sans-serif;font-size:15px;">Verify Email</center>
                                                </v:roundrect><![endif]-->
                                                    <a href=${link} className="button button--blue">Verify Email</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <p>Thanks,<br> Vyb Team</p>
                                    <!-- Sub copy -->
                                    <table className="body-sub">
                                        <tr>
                                            <td>
                                                <p className="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.
                                                </p>
                                                <p className="sub"><a href=${link}>${link}</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table className="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                            <tr>
                                <td className="content-cell">
                                    <p className="sub center">
                                       Vyb Lifestyle Private Limited
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Piyush Kumar 👻"demosclabs@gmail.com', // sender address
      to: email, // list of receivers
      subject: "email verification", // Subject line
      text: `localhost:3000/verifyEmail/${email}`, // plain text body
      html: newHtmlTemplate, // html body
    });
    console.log("info----", info);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (err) {
    console.log("err------", err);
    throw err;
  }
};
module.exports = sendEmail;
