const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapBoxToken});



//ALL LISTING ROUTE
module.exports.index = async(req,res) => { 
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}

//CREATE NEW LISTING ROUTE
module.exports.createListing = (req,res) => {
    res.render("./listings/new.ejs");
}

//SHOW ROUTE
module.exports.showListing = async(req,res) => {
    let{id} = req.params;
    let data = await Listing.findById(id).populate({path: "reviews",populate:{path: "author"}}).populate("owner");

    if(!data){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }


    res.render("./listings/show.ejs",{data});
};

//ADD NEW LISTING ROUTE
module.exports.addNewListing = async(req,res,next) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "send valid data for listing");
    // }

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send()


    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    newlisting.geometry = response.body.features[0].geometry
    let savedLst = await newlisting.save();
    console.log(savedLst);
    req.flash("success","Successfully created a new listing");
    res.redirect("/listings");
};

//Edit Route
module.exports.editListing = async(req,res) => {
    let{id} = req.params;
    let listing = await Listing.findById(id);

    let orginalImageUrl = listing.image.url;
    orginalImageUrl = orginalImageUrl.replace("/uplode","/uplode/c_fill,h_200,w_400")

    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    res.render("./listings/update.ejs",{listing,orginalImageUrl});
};

//Update Route
module.exports.updateListing = async(req,res) => {
    if(!req.body.listing){
        throw new ExpressError(400, "send valid data for listing");
    }

    let{id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Successfully updated the listing");
    res.redirect(`/listings/${id}`);

};

//DELETE ROUTE
module.exports.destroyListing = async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Successfully deleted the listing");
    res.redirect("/listings");
};