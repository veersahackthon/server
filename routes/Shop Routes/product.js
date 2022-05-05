const Product = require('../../Database/ShopModels/Product');
const { verifyTokenAndAdmin } = require('../verifyToken');
const { cloudinary } = require('../../config/cloudinary');
const router = require('express').Router();

// adding new product
// var imgLink = '';
// router.post('/upload', async (req, res) => {
//   try {
//     const fileString = req.body.data;
//     // console.log(fileString);
//     const uploadedResponse = await cloudinary.uploader.upload(fileString, {
//       upload_preset: 'ml_default',
//     });

//     imgLink = uploadedResponse.url;
//     console.log(imgLink);
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.post('/', async (req, res) => {
//   const newProduct = new Product(req.body);
  
//   const fileString = req.body.data;
//   console.log("hiii "+fileString);
//   try {
//   const uploadedResponse = await cloudinary.uploader.upload(fileString, {
//     upload_preset: 'ml_default',
//   });
//   console.log("here i am");
//     newProduct.img = uploadedResponse.url;
//     const savedProduct = await newProduct.save();
    
//    console.log("this is here "+newProduct.img);
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(200).json(err);
//   }
// });
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(200).json(err);
    res.status(200).json("error is here",err);
  }
});

//UPDATE the product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE only admin can
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT any one can find a product
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all products
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
