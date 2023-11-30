const Product = require("../models/productModel");

//----create a product-----

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// -----get single product

exports.getProduct = async (req, res, next) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      throw new Error("Product Not Found With The Given Id");
    }
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Product Not Found With The Given Id",
      errorDetails: error.message,
    });
  }
};

// -----delete single product

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new Error("Product Not Found With The Given Id");
    }
    res.status(200).json({
      success: true,
      message: "Product Successfully Deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Product Not Found With The Given Id",
      errorDetails: error.message,
    });
  }
};

// exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return next(new ErrorHandler("Product Not Found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product Successfully Deleted",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the product",
//     });
//   }
// });

//-------- get all products-----

exports.getAllProducts = async (req, res) => {
  try {
    const { page, pageSize, productName, category } = req.query;
    let products;
    const query = {};

    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }

    if (productName) {
      query.name = {
        $regex: productName,
        $options: "i",
      };
    }

    products = await Product.find(query);

    if (products.length === 0) {
      throw new Error(
        `Products Not Available  ${
          productName ? `with productname:- ${productName}` : {}
        } ${category ? ` and with category:- ${category}` : {}}`
      );
    }
    const totalProducts = products.length;
    const pageNumber = page || 1;

    const pageS = pageSize || 6;

    const skip = (pageNumber - 1) * pageS;
    const lastIndex = skip + Number(pageS);
    console.log(skip, lastIndex);
    products = products.slice(skip, lastIndex);

    res.status(200).json({
      status: "success",
      totalProducts,
      products,
      pageS,
      pageNumber,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
