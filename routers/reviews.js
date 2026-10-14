const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/warpAsync.js");
const {isLoggedIn,validateReview,isAuthor} = require("../middlewares.js");
const reviewController = require("../controllers/reviews.js");
// const { route } = require("./listings.js");



// REVIEWS 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//REVIEW DELETE
router.delete("/:reviewId", isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;