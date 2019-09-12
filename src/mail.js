const config = require("../config");

const nodemailer = require("nodemailer");

async function sendMail(email) {
  await main(email);
}

async function main(email) {
  let transporter = nodemailer.createTransport({
    service: config.mailServer.service,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.mailServer.email,
      pass: config.mailServer.password
    },
    debug: config.mailServer.debug,
    logger: config.mailServer.logger
  });

  let info = await transporter.sendMail({
    from: config.mailServer.email,
    to: email,
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;
