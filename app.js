//for ENV file 
if(process.env.NODE_ENV!="prodution"){
require('dotenv').config();
}


const express  = require("express");
const app = express();
const mongoose = require("mongoose");
//import from listing.js
const Listing = require('./models/listing.js');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session =require("express-session");
//for database validation using JOI
const {listingSchema, reviewSchema} = require("./schema.js");
//review model
const Review = require('./models/review.js');
//For login 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const MongoStore = require('connect-mongo');

const listingRouter = require("./routes/listing.js");
const reviewsRouter =require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

const flash= require("connect-flash");
//for mongoose database                -- database NAME--(wanderlust)
// const mogo_url="mongodb://127.0.0.1:27017/wanderlust";
//cloud DB
const dburl =process.env.ATLASDB_URL;

main()
    .then(()=>{ 
console.log("connect to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dburl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public" )));

//keep save user session for 24 if no changes happen in backend
const store = MongoStore.create({
    mongoUrl: dburl,
   crypto:{
    secret:process.env.SECRET,
   },
   touchAfter: 24*3600,
  });

  store.on("errot",()=>{
    console.log("ERROR IN MONGO SESSION")
  })
//use session
const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
};
//this is api
// app.get("/", (req,res)=>{
//     res.send("hi, i am not bot");
// });


app.use(session(sessionOptions));
app.use(flash());

//passport implement 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demoUser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });

//     let newUser = await User.register(fakeUser, "helloworld");
//     res.send(newUser);
// });



app.use("/listings", listingRouter); 
app.use("/listings/:id/reviews",reviewsRouter);

// Root route handler
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/",userRouter);

// 404 handler - must be before error handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  // Check if headers have already been sent
  if (res.headersSent) {
    console.log("Headers already sent, skipping error handler");
    return next(err);
  }
  
  console.log("Error occurred:", err.message);
  console.log("Request URL:", req.url);
  console.log("Request method:", req.method);
  
  let { statusCode =500, message="something went wrong!" } = err;
  
  try {
    res.status(statusCode).render("error.ejs",{err});
  } catch (renderError) {
    console.log("Error rendering error template:", renderError.message);
    res.status(statusCode).send(`Error: ${message}`);
  }
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});