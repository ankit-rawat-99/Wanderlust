const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
//review model
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { validateReview ,isLoggedIn,isReviewAuthor} = require("../middleware.js");
//MNC controller
const reviewController = require("../controllers/reviews.js");


//Reviwes
//post route 
router.post(
  "/",isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// app.use("/listings",listings);

//Delete REview route
router.delete(
  "/:reviewId",isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;

//validation for schema (middleware)
// const validateListing = (req,res,next)=>{
//    let {error}=  listingSchema.validate(req.body);
//   if(error){
//     let errMsg = error.details.map((el) =>el.message).join(",");
//     throw new ExpressError(400,errMsg);
//   }else{
//     next();
//   }
// }


// //validate review 
// const validateReview = (req,res,next)=>{
//    let {error}=  reviewSchema .validate(req.body);
//   if(error){
//     let errMsg = error.details.map((el) =>el.message).join(",");
//     throw new ExpressError(400,errMsg);
//   }else{
//     next();
//   }
// }

// //Index Route
// app.get(
//   "/listings",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
//   })
// );

// //New Route
// app.get(
//   "/listings/new",
//   wrapAsync(async (req, res) => {
//     res.render("listings/new.ejs");
//   })
// );

// //Show Route
// app.get(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;                   //
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs", { listing });
//   })
// );

// //Create Route
// app.post(
//   "/listings",validateListing,
//   wrapAsync(async (req, res, next) => {
 
//   const newListing = new Listing(req.body.listing);
    
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );

// //Edit Route
// app.get(
//   "/listings/:id/edit",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
//   })
// );

// //Update Route
// app.put(
//   "/listings/:id",validateListing,
//   wrapAsync(async (req, res) => {
 
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
//   })
// );

// //Delete Route
// app.delete(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
//   })
// );

// Reviwes
// // post route 
// app.post(
//   "/listings/:id/reviews",
//   validateReview,
//   wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listings/${listing._id}`);
//   })
// );


// //Delete REview route
// app.delete(
//   "/listings/:id/reviews/:reviewId",
//   wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;

//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
//   })
// );


// app.all("*" , (req,res,next) =>{
//   next(new ExpressError(404 ,"page not found"));
// });/ 