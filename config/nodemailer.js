const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendgridTransport = require("nodemailer-sendgrid-transport");
const User = require("../Database/User");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);
transporter.sendMail({
  to: "monuyadav94161@gmail.com",
  from: "Gillyweed.connect@gmail.com",
  subject: "Verification Code By GillyWeed",
  html: "<H1>Hi Dhaabi How your dieting Going</H1>",
});
module.exports = transporter;
