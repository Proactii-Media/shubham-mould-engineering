const { plasticproduct, applications } = require("../../constants/data");

const getAllPlasticproduct = async (req, res) => {
    try {
        res.render("Plastic-products", {
            plasticproduct,
            applications,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};


const getPlasticProductSlug = async (req, res) => {
    try {
        const slug = String(req.params.slug)
            .trim()
            .toLowerCase();

        const product = plasticproduct.find(item => {
            const productSlug = String(item.slug)
                .trim()
                .toLowerCase();

            return productSlug === slug;
        });

        if (!product) {
            return res.status(404).send("Plastic Product not found");
        }

        res.render("Plastic_product_detail", {
            product,
            plasticproduct,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};


module.exports = {
    getAllPlasticproduct,
    getPlasticProductSlug
};