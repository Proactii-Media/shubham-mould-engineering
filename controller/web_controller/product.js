

// const { products } = require("../../constants/data");
// const { applications } = require("../../constants/data");

// const getAllproduct = async (req, res) => {
//     try {
//         res.render("engineering-products", {
//             products,
//             applications,
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// const getProductSlug = async (req, res) => {
//     try {

//         const slug = String(req.params.slug).trim().toLowerCase();

    

//         const product = products.find(item => {

//             const productSlug = String(item.slug)
//                 .trim()
//                 .toLowerCase();

         
//             return productSlug === slug;
//         });

     

//         if (!product) {
//             return res.status(404).send("Product not found");
//         }

//         res.render("product_detail", {
//             product,
//             applications,
//             products
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


// module.exports = {
//     getAllproduct,
//     getProductSlug
// };


const { products, applications } = require("../../constants/data");

const getAllproduct = async (req, res) => {
    try {

        // Create unique product types based on category
        const productTypes = [
            ...new Map(
                products.map(product => [
                    product.category,
                    {
                        type: product.type,
                        category: product.category
                    }
                ])
            ).values()
        ];

        res.render("engineering-products", {
            products,
            applications,
            productTypes
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};


const getProductSlug = async (req, res) => {
    try {

        const slug = String(req.params.slug)
            .trim()
            .toLowerCase();

        const product = products.find(item => {

            const productSlug = String(item.slug)
                .trim()
                .toLowerCase();

            return productSlug === slug;
        });

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render("product_detail", {
            product,
            applications,
            products
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
};


module.exports = {
    getAllproduct,
    getProductSlug
};