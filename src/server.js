const config = require("../config");

var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var cors = require("cors");

const punycode = require("punycode");
const uts46 = require("idna-uts46-hx");
const path = require("path");
const sendMail = require("./mail");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || config.port; // set our port

var router = express.Router();

router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

const EMAIL_REGEX = /[^\u0000-\u007F]+@[^\u0000-\u007F]+\.[^\u0000-\u007F]+/g;

router.post("/", async (req, res) => {
  const content = req.body;
  console.log("content", content);
  const email = content.user.email;
  //   const indexOfUsername = email.indexOf("@");
  //   const username = email.substring(0, indexOfUsername);
  //   const domain = email.substring(indexOfUsername + 1);
  //   console.log(username, domain);
  //   console.log("uts46.toUnicode(domain)", uts46.toUnicode(domain));
  //   console.log("uts46.toAscii(domain)", uts46.toAscii(domain));
  //   console.log(
  //     "punycode.toUnicode(uts46.toAscii(domain))",
  //     punycode.toUnicode(uts46.toAscii(domain))
  //   );
  // if (!EMAIL_REGEX.test(email)) {
  //   return res.status(400).json({ message: "Email not valid" });
  // }
  const encodedEmail = email;
  // चौधरीहरीश@डाटामेल.भारत
  //   await sendMail(encodedEmail);
  await sendMail(encodedEmail);
  // return res.json(username + "@" + punycode.toUnicode(uts46.toAscii(domain)));
  return res.json("Mailed sent successfully");
});

app.use("/api", router);

app.listen(port);
console.log("Magic happens on port " + port);
