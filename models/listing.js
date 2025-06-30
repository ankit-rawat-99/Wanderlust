const mongoose = require("mongoose"); 
const number = require("mongoose/lib/cast/number");
const { title } = require("process");
const review = require("./review");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
      type:  String,
      required:true,
    },
    description: String,
   image: {
    url:String,
    filename:String,
},
      price: {
        type: Number, 
    },
    location: String,
    country: String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    owner:{
    type: Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point"
  },
  coordinates: {
    type: [Number], // [lng, lat]
    required: true,
    default: [0, 0]
  }
}

});
//mongooes middlesware
listingSchema.post("findOneAndDelete", async function(listing) {
  if (listing) {
    await Review.deleteMany({ reviews: { $in: listing.reviews } });
  }
});
 //create a model 
const Listing = mongoose.model("listing", listingSchema);
//export in app.js
module.exports = Listing;