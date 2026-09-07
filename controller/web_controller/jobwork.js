
const { applications } = require("../../constants/data");

const getAllJobWork = async (req, res) => {

try {
    res.render("our_job_work", {
      applications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { getAllJobWork };