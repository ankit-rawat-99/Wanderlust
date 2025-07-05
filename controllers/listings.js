const Listing = require('../models/listing.js');

module.exports.index = async (_req, res) => {
    const allListings = await Listing.find({});
    return res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (_req, res) => {
    return res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Your Requested For Does Not Exist !");
        return res.redirect("/listings");
    }
 return   res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    try {
        const location = req.body.listing.location;
        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const geoData = await geoRes.json();

        let geometry = { type: "Point", coordinates: [0, 0] };
        if (geoData && geoData.length > 0) {
            geometry = {
                type: "Point",
                coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)]
            };
        }

            let url = "", filename = "";
            if (req.file) {
            url = req.file.path;
            filename = req.file.filename;
            }

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = geometry;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        return res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/listings/new");
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Your Requested For Does Not Exist !");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/c_scale,h_250,w_370/");
 return   res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        
        // Get the updated location
        const location = req.body.listing.location;
        
        // Fetch new coordinates for the updated location
        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const geoData = await geoRes.json();

        let geometry = { type: "Point", coordinates: [0, 0] };
        if (geoData && geoData.length > 0) {
            geometry = {
                type: "Point",
                coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)]
            };
        }

        // Update the listing with new data including geometry
        let listing = await Listing.findByIdAndUpdate(id, { 
            ...req.body.listing,
            geometry: geometry
        });
        
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        
        // Handle image update if provided
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }
        
        req.flash("success", "Updated Listing !");
        return res.redirect(`/listings/${id}`);
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Deleted Listing !");
    return res.redirect("/listings");
};