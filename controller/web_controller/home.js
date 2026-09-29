
const { clientLogos, services,applications,products, homeSliders } = require("../../constants/data");


const getAllHome = async (req, res) => {
  try {
    res.render("home", {
      homeSliders,
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