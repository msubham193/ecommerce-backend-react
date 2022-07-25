const express = require("express");
const {
  newWish,
  myWishList,
  deleteWishList,
} = require("../controllers/wishlistController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { route } = require("./orderRoute");
const router = express.Router();

router.post("/wishlist/new", isAuthenticatedUser, newWish);
router.get("/wishlist/me", isAuthenticatedUser, myWishList);
router.delete("/wishlist/:id", isAuthenticatedUser, deleteWishList);

module.exports = router;
