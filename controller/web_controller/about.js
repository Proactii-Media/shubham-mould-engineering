
const { applications } = require("../../constants/data");

const getAllAbout = async (req, res) => {

try {
    res.render("about", {
      applications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllAbout };