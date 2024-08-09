const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index =async (req,res,next) => {
    const allListings =await Listing.find({})
    res.render("listings/index.ejs",{allListings});
};
module.exports.category =async (req,res,next) => {
   
    let {cat} = req.params;
   
    let  allListings =await Listing.find({});
    
    allListings =  allListings.filter((ele) =>  ele.category == cat); 
    
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res) => {

    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res,next) => {
    let {id} = req.params;
    
    const listing =await Listing.findById(id).populate({path:"reviews", populate:{path:"author"},}).populate("owner");
    if(!listing) {
        req.flash("error","Listing you requested does not exists !");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing  = async  (req,res,next) => {
    //if post req through postman or hoppscotch then also user should be logged in
    // let {title,description,image,price,location,country} =req.body;
    let  response =await geocodingClient.forwardGeocode({
        query: req.body.listings.location,
        limit: 1,
      })
    .send();
    let url =req.file.path;
    let filename= req.file.filename;
const newListing = new Listing(req.body.listings);
newListing.owner = req.user._id;
newListing.image = {url,filename};
newListing.geometry = response.body.features[0].geometry;
let savedListing = await newListing.save();
console.log(savedListing);
req.flash("success","New Listing Created !");
res.redirect("/listings");

};

module.exports.renderEditForm = async (req,res,next) => {
    let {id} =req.params;
    const listing =await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested does not exists !");
        res.redirect("/listings");
    }

    let originalListingUrl = listing.image.url;
    originalListingUrl= originalListingUrl.replace("/upload","/upload/w_300")
    res.render("listings/edit.ejs",{listing ,originalListingUrl})
    
    };

module.exports.updateListing = async (req,res,next) => {


    let {id} =req.params;
     let listing = await Listing.findByIdAndUpdate(id,{...req.body.listings});
     

     if(typeof req.file !== "undefined") { 
     let url =req.file.path;
     let filename= req.file.filename;
     listing.image = {url,filename};
     await listing.save();
    }
     req.flash("success"," Listing Updated Successfully ");
     res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async  (req,res,next) => {
    let {id} =req.params;
   let deletedListing=await Listing.findByIdAndDelete(id);
   req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
    console.log(deletedListing);
};
