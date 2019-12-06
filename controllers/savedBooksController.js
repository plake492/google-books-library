const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    console.log("\nFIND ALL", req.body);
    db.SavedBooks.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createNewSavedBook: function(req, res) {
    console.log("\n CREATE", req.body);
    db.SavedBooks.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
