const Product = require('../model/Product')
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs')


exports.uploadImage = async (req, res) => {
  // recieving File from the Fronend 
  const img = req.files.image;

  const cloudName = 'dbm5vfupw';
  const presetName = 'MyEcommerceWebsite';

  const uploaded_images = img.map( async (file) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.tempFilePath)); // append the file buffer data
    formData.append('upload_preset', presetName);
    formData.append('folder', 'Ecommerce-website')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
      );
      return response.data.secure_url;
    } catch (err) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });
  try {
    const imgArray = await Promise.all(uploaded_images)
    res.status(202).json(imgArray);
  } catch(err) {
    console.log("error in the process")
  }
};

exports.addProduct = async (req,res) => {
  const product = new Product({
    Title: req.body.Title,
    Category: req.body.Category,
    Description: req.body.Description,
    Quantity: req.body.Quantity,
    Images: req.body.Images,
    Price: req.body.Price,
    User:req.body.UserId
  })
  const response = await product.save();
  res.status(200).json(response);
}

exports.getAllProducts = async(req,res)=> {
  try {
    const allProducts = await Product.find()
    console.log(allProducts);
    res.status(200).json(allProducts);
  } catch(err) {
    console.log(err)
  }
}