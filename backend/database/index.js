const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
const defaults = { favorites: [], users: [], count: 0 };

db.defaults(defaults).write();

const cleanDb = () => {
  db.get("users").remove().write();
  db.get("favorites").remove().write();
};

exports.cleanDb = cleanDb;
exports.db = db;
