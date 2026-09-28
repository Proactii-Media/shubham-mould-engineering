const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();

const webRouter = require("./route/webRoute");

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Current route
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    next();
});

// Google reCAPTCHA Site Key
app.use((req, res, next) => {
    res.locals.recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
    next();
});

// Web routes
app.use("/", webRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

module.exports = app;