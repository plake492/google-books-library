const router = require("express").Router();
const savedBooksRoutes = require("./savedBooks");

// user routes
router.use("/savedbooks", savedBooksRoutes);

module.exports = router;
