const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.user);
    // console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be looged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let{id}=req.params;
    let listing = await Listing.findById(id);
     if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you dont have any access to change");
         return res.redirect(`/listing/${id}`);
     }
     next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let{id,reviewsId} = req.params;
    let review = await Review.findById(reviewsId);
     if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you dont have any access to change the review");
         return res.redirect(`/listing/${id}`);
     }
     next();
}

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
}

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
    if(error){
       let errMsg = error.details.map((el)=>el.message).join(",");
       throw new ExpressError(400,errMsg);
   }else{
    next();
   }
}