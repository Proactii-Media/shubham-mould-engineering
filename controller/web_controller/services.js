
const { applications, deliveryServices, afterSalesServices } = require("../../constants/data");

const getAllService = async (req, res) => {

try {
    res.render("services", {
      applications,
      deliveryServices,
      afterSalesServices,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllService };