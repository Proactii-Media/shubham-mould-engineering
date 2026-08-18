const express = require("express");
const webRouter = express.Router();

const home = require("../controller/web_controller/home.js");
const about = require("../controller/web_controller/about.js");
const contact = require("../controller/web_controller/contact.js");
const application = require("../controller/web_controller/application.js");
const qualityPolicy = require("../controller/web_controller/qualitypolicy.js");
const product_detail = require("../controller/web_controller/product.js");
const product = require("../controller/web_controller/product.js");


webRouter.get("/", home.getAllHome);
webRouter.get("/about", about.getAllAbout);
webRouter.get("/contact", contact.getAllContact);
webRouter.post("/contact", contact.sendContactMail);
webRouter.get("/quality_policy", qualityPolicy.getAllQualityPolicy);
webRouter.get("/applications", application.getAllApplications);
webRouter.get("/products", product.getAllproduct);
webRouter.get("/products/:slug", product.getProductSlug);

module.exports = webRouter;