
const { clientLogos, services,applications,products } = require("../../constants/data");


const getAllHome = async (req, res) => {
  try {
    res.render("home", {
      clientLogos,
      services,
      applications,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllHome };