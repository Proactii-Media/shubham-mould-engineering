const express = require("express");
const webRouter = express.Router();

const home = require("../controller/web_controller/home.js");
const about = require("../controller/web_controller/about.js");
const contact = require("../controller/web_controller/contact.js");
const application = require("../controller/web_controller/application.js");
const qualityPolicy = require("../controller/web_controller/qualitypolicy.js");

const product = require("../controller/web_controller/product.js");
const plasticproduct = require("../controller/web_controller/plasticproduct.js")
const clientLogos = require("../controller/web_controller/clientlogos.js");


webRouter.get("/", home.getAllHome);
webRouter.get("/about", about.getAllAbout);
webRouter.get("/contact", contact.getAllContact);
webRouter.post("/contact", contact.sendContactMail);
webRouter.get("/quality_policy", qualityPolicy.getAllQualityPolicy);
webRouter.get("/applications", application.getAllApplications);
webRouter.get("/engineering-products", product.getAllproduct);
webRouter.get("/engineering-products/:slug", product.getProductSlug);

webRouter.get("/plastic-products", plasticproduct.getAllPlasticproduct);
webRouter.get("/plastic-products/:slug",plasticproduct.getPlasticProductSlug);





webRouter.get("/our_clients", clientLogos.getAllClientlogos)

module.exports = webRouter;