const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const Listing = require('../models/listing.js');
const passport = require("passport");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingcontrollers = require("../controllers/lisitng.js");

const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
// const upload = multer({ dest: 'uploads/' });
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingcontrollers.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingcontrollers.createListing)
    );

 router.route("/new")
.get(isLoggedIn,listingcontrollers.renderNewform);

router.route("/:id")
.get(wrapAsync(listingcontrollers.showListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing,wrapAsync(listingcontrollers.updateLisitng))
.delete(isLoggedIn,isOwner,wrapAsync(listingcontrollers.destroyListing));

router.route("/:id/edit")
.get(isLoggedIn,isOwner,wrapAsync(listingcontrollers.editListing));



// index route
// router.get("/",wrapAsync(listingcontrollers.index));
 //New Route(1)
//  router.get("/new", isLoggedIn,listingcontrollers.renderNewform);
 // show route
//  router.get("/:id",wrapAsync(listingcontrollers.showListing));   
 // create route(1)
//  router.post("/",isLoggedIn,validateListing,wrapAsync(listingcontrollers.createListing));
// router.post("/",upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// });
 // edit route
//  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontrollers.editListing));
 // update route
//  router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingcontrollers.updateLisitng));
 // delete route
//  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingcontrollers.destroyListing));

 module.exports = router;