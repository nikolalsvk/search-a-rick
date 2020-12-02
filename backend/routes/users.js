var express = require("express");
var router = express.Router();

var database = require("../database");
var db = database.db;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/clean_db", function (req, res, next) {
  database.cleanDb();
  res.send("respond with a resource");
});

router.post("/sign_up", function (req, res, next) {
  const user = req.body.user;
  const email = user.email;
  const password = user.password;

  console.log(user);

  if (userExists(email, password)) {
    res.send({ errors: ["User already exists"] });
    return;
  }

  db.get("users")
    .push({ ...user, token: generateToken() })
    .write();

  res.send({ success: true });
});

router.post("/sign_in", function (req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;

  const user = userExists(email, password);
  console.log("User is logged in: ", user);

  if (user) {
    res.set({
      "Access-Token": user.token,
      "Access-Control-Expose-Headers": "Access-Token",
    });
    res.send({ success: true });
    return;
  }

  res.send({ errors: ["Wrong credentials."] });
});

const userExists = (email, password) => {
  if (email === "test@rick.morty" && password === "beth123")
    return { email, password, token: "please-enter-123" };

  return db.get("users").find({ email, password }).value();
};

const generateToken = () => {
  return Math.random().toString(36).substring(7);
};

module.exports = router;
