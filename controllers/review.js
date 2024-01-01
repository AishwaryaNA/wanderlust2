const Review = require("../models/review.js");
const Listing = require('../models/listing.js');

module.exports.createReview = async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
   //  console.log(newReview);
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review created");
    res.redirect(`/listing/${listing._id}`);
 };

 module.exports.destroyReview = async(req,res,next)=>{
    let{id,reviewsId} = req.params;
   console.log(req.params);
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewsId}});
      await Review.findByIdAndDelete(reviewsId);
      req.flash("success","review deleted");
      res.redirect(`/listing/${id}`);
 }