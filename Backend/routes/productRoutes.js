const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route PUT /api/products/:id
// @desc Update an existing product
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // Update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes !== undefined ? sizes : product.sizes;
      product.colors = colors !== undefined ? colors : product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images !== undefined ? images : product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags !== undefined ? tags : product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the updated product in DB
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    //console.log("deleted" , product);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// @route GET /api/products
// @desc get all products with optional query filters
// @access public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: color.split(",") };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ];
    }

    // Sorting logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDsc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Debug
    //console.log("Final Mongo Query:", JSON.stringify(query, null, 2));

    // DB Fetch
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit ? Number(limit) : 0);
    //console.log(products);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async(req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({
      rating : -1
    });

    if(bestSeller){
      res.json(bestSeller);
    }
    else{
      res.status(404).json({Message : "Product Not Available"});
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Server Error" });
  };
});


// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products
// @access public
router.get("/new-arrivals", async (req, res) => {
  try {
    const bestSeller = await Product.find().sort({ createdAt: -1 }).limit(8);

    if (bestSeller && bestSeller.length > 0) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "Product Not Available" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


// @route GET /api/products/:id
// @desc get a single product
// @acess public
router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const product = await Product.findById(id);

    if(product){
      res.status(200).json(product);
    }
    else{
      res.status(404).json({Message : "Product Not Available"});
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Internal Server Error" });
  }
});


// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender & category
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) {
      const similarProducts = await Product.find({
        _id: { $ne: id },
        gender: product.gender,
        category: product.category,
      }).limit(4);

      res.json(similarProducts);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
