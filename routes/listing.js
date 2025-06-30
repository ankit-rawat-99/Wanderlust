const express = require("express");
const  router =express.Router();
// ...other requires
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); 
//for image upload
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
//joi
const { required } = require("joi");
const { isLoggedIn, isOwner ,validateListing } = require("../middleware.js");
//MVC controller
const listingController = require("../controllers/listings.js");

//Index Route //Create Route using router.route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    // validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn,wrapAsync(listingController.renderNewForm) 
);

// //Show Route  //Update Route //Delete Route
router.route("/:id")
  .get(isLoggedIn, wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner,    upload.single("listing[image]"),
 validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;