
const { applications } = require("../../constants/data");

const getAllApplications = async (req, res) => {
  try {
    res.render("applications", {
        applications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllApplications };