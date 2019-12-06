const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose
  .connect("mongodb://localhost/books", { useNewUrlParser: true })
  .then(
    console.log("\n==================\nMongodb connected\n==================\n")
  );

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
