const express = require("express");
const router = express.Router({mergeParams:true});
const Review = require("../models/review.js");
const Listing = require('../models/listing.js');
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/review.js")

// reviwes post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControllers.createReview));
 
 // review delete route
 router.delete("/:reviewsId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

 module.exports = router;