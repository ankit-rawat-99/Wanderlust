const Listing = require("./models/listing");
const Review = require("./models/review");

const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");


module.exports.isLoggedIn =(req,res,next)=>{

      if (!req.isAuthenticated()) {
req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be logged in to create listing!");
      return res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner =async(req,res,next)=>{
  let { id } = req.params;
    
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

//validation for schema (middleware)
module.exports.validateListing = (req,res,next)=>{
   let {error}=  listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) =>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
}
//validate review 
module.exports.validateReview = (req,res,next)=>{
   let {error}=  reviewSchema .validate(req.body);
  if(error){
    let errMsg = error.details.map((el) =>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
}
module.exports.isReviewAuthor  =async(req,res,next)=>{
  let { id,reviewId } = req.params;
    
    let review = await Review.findById(reviewId);
    if (!review) {
      req.flash("error", "Review not found!");
      return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(req.user._id)) {
      req.flash("error", "You did not create this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

