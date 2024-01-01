const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async(req,res)=>{
    let allListings =  await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 }

 module.exports.renderNewform = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = (async(req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
     if(!listing ){
        req.flash("error","Listing you requested for does not exsist");
        res.redirect("/listing");
     }
   res.render("listings/show.ejs",{listing});
   });

   module.exports.createListing = (async(req,res,next)=>{
    // console.log(req.body.listing.location);
    let response = await geocodingClient.forwardGeocode({
       query:req.body.listing.location,
        limit: 1
      })
     .send();
    //  console.log(response.body.features[0]. geometry);
    //  res.send("done");
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url ,"..",filename );
     const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0]. geometry;
     let savedListing = await newListing.save();
     console.log(savedListing);
    req.flash("success","New lisitng created successfully");
    res.redirect("/listing");
    });

    module.exports.editListing = async(req,res)=>{
        let{id} = req.params;
        let listing = await Listing.findById(id);
        if(!listing ){
           req.flash("error","Listing you requested for does not exsist");
           res.redirect("/listing");
        }
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250");
        res.render("listings/edit.ejs",{listing,originalImageUrl});
    };

    module.exports.updateLisitng = async(req,res,next)=>{
        let{id}=req.params;
        let lisitng =  await Listing.findByIdAndUpdate(id,{...req.body.listing});
        if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        lisitng.image = {url,filename};
        await lisitng.save();
        }
        req.flash("success","Lisitng updated");
        res.redirect(`/listing/${id}`);
    };

    module.exports.destroyListing =async(req,res)=>{
        let{id} = req.params;
        let deletedList = await Listing.findByIdAndDelete(id);
        console.log(deletedList);
        req.flash("success","Lisitng deleted");
        res.redirect("/listing");
        };