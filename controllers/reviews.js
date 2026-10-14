const Review = require('../models/review');
const Listing = require("../models/listing");

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user;

    listing.reviews.push(newreview);

    await newreview.save();
    await listing.save();
    
    req.flash("success","Successfully created a new review !");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async(req,res) => {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Successfully deleted the review !");
    res.redirect(`/listings/${id}`);
};