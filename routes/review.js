const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const {validateReview} = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const reviewController = require("../controllers/reviews.js");


// Post reviews 


router.post("/",validateReview,isLoggedIn, wrapAsync (reviewController.createReview));
   
//delete  review route
   
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));
   

module.exports = router;