var express = require("express");
var router = express.Router();

var database = require("../database");
var db = database.db;

/* GET favorites listing. */
router.get("/", function (req, res, next) {
  const token = req.header("Access-Token");

  if (!token) {
    res.send("No token!");
    return;
  }

  const user = getUserByToken(token);

  if (!user) {
    res.send("Please log in first!");
    return;
  }

  console.log(user.email);

  const emailAndFavorites = db
    .get("favorites")
    .find({ email: user.email })
    .value() || { user: user.email, favorites: [] };

  console.log("User's favorites ", emailAndFavorites);
  res.send(emailAndFavorites.favorites);
});

router.post("/", function (req, res, next) {
  const token = req.header("Access-Token");

  if (!token) {
    res.send("No token!");
    return;
  }

  const user = getUserByToken(token);

  if (!user) {
    res.send("Please log in first!");
    return;
  }

  console.log(user.email);
  const emailAndFavorites = db
    .get("favorites")
    .find({ email: user.email })
    .value() || { favorites: [] };
  const favorites = emailAndFavorites.favorites;

  console.log("Existing favorites ", favorites);
  const newFavorite = req.body.id;

  if (favorites.length === 0) {
    db.get("favorites")
      .push({ email: user.email, favorites: [newFavorite] })
      .write();
    res.send({
      message: "Success! First character saved as a favorite.",
      favorites: req.body,
    });
    return;
  }

  let newFavorites = Array.from(new Set(favorites.concat(newFavorite)));

  if (favorites.find((id) => id === newFavorite)) {
    newFavorites = newFavorites.filter((id) => id !== newFavorite);
  }
  console.log("New favorites ", newFavorites);

  db.get("favorites")
    .find({ email: user.email })
    .assign({ favorites: newFavorites })
    .write();

  res.send({ message: "Success!", favorites: newFavorites });
});

const getUserByToken = (token) => {
  if (token === "please-enter-123") return { email: "test@rick.morty" };
  return db.get("users").find({ token }).value();
};

module.exports = router;
