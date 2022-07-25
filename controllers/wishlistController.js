const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Wish = require("../models/wishlistModel");

exports.newWish = catchAsyncError(async (req, res, next) => {
  const { name,description, price, rating, size, color, images, Stock } = req.body;

  const cart = await Wish.create({
    name,
    description, 
    price,
    rating,
    size,
    color,
    images,
    Stock,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    cart,
  });
});

//get logged in user WishList

exports.myWishList = catchAsyncError(async (req, res, next) => {
  const wishList = await Wish.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    wishList,
  });
});

//Delete wish list

exports.deleteWishList = catchAsyncError(async (req, res, next) => {
  const wishList = await Wish.findById(req.params.id);

  if (!wishList) {
    return next(new ErrorHandler("Product not found with this Id", 404));
  }
  await wishList.remove();

  res.status(200).json({
    success: true,
  });
});
