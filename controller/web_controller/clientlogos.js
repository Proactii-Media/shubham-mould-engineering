
const { clientLogos,applications } = require("../../constants/data");


const getAllClientlogos = async (req, res) => {
  try {
    res.render("our_clients", {
      clientLogos,
        applications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllClientlogos };