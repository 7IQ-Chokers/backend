const nodemailer = require("nodemailer");
const configs = require("../config/config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: configs.sys_email_address,
    pass: configs.sys_email_password,
  },
});

async function sendMail(
  email,
  subject,
  textcontent,
  htmlcontent
) {
  const info = await transporter.sendMail({
    from: `"ConnectNSolve" <${configs.sys_email_address}>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: textcontent, // plain text body,
    html: htmlcontent,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;