const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const users = require("./routes/api/users");
const articles = require("./routes/api/articles");
const { checkToken } = require("./middleware/auth");

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}retryWrites=true&w=majority`;

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, res) {
    try {
      console.log("Connected to Database");
    } catch (err) {
      throw err;
    }
  }
);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());
app.use(checkToken);
app.use("/api/users", users);
app.use("/api/articles", articles);

app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});


//Test