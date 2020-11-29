var express = require("express");
var router = express.Router();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ favorites: [], users: [], count: 0 }).write();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign_up", function (req, res, next) {
  const user = req.body.user;

  console.log(user);
  db.get("users").push(user).write();

  res.send({ success: true });
});

router.post("/sign_in", function (req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;

  console.log(userExists(email, password));
  if (userIsRick(email, password) || userExists(email, password)) {
    res.set({
      "Access-Token": "please-enter-123",
      "Access-Control-Expose-Headers": "Access-Token",
    });
    res.send({ success: true });
    return;
  }

  res.send({ errors: ["Wrong credentials."] });
});

function userIsRick(email, password) {
  return email === "test@rick.morty" && password === "beth123";
}

function userExists(email, password) {
  return db.get("users").find({ email, password }).value();
}

module.exports = router;
