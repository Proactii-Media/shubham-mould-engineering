
const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");

const webRouter = require("./route/webRoute");

// ===============================
// EJS SETUP
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));


// ===============================
// STATIC FILES
// ===============================

app.use(express.static(path.join(__dirname, "public")));


// ===============================
// CURRENT ROUTE
// ===============================

app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    next();
});


// ===============================
// WEB ROUTES
// ===============================

app.use("/", webRouter);


// ===============================
// VERCEL
// ===============================

// const PORT = null || 3000; 
// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

module.exports = app;

        

