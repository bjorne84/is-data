//require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const mongoose = require("mongoose");
//const { MONGO_URI } = require('./config');
console.log(process.env.MONGO_URI);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Mongo Database."))
  .catch((err) => console.log(err));

//BodyParser Middleware, for use of JSON in body
app.use(cors());
app.use(express.json());

// skapa statisk sökväg, så den kan komma åt filer i public-katalogen
app.use(express.static(path.join(__dirname, "public")));

// Routes
const postRoutes = require("./routes/api/posts.js");
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
