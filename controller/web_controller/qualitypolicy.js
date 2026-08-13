
const { applications } = require("../../constants/data");



const getAllQualityPolicy = async (req, res) => {
  try {
    res.render("quality_policy", {
      applications,
     
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllQualityPolicy };