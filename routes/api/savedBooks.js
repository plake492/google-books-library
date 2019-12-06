const router = require("express").Router();
const savedBooksController = require("../../controllers/savedBooksController");

router
  .route("/")
  .post(savedBooksController.createNewSavedBook)
  .get(savedBooksController.findAll);
