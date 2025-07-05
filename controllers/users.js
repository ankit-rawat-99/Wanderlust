const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  return  res.render("users/signup.ejs")
};
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        
        // Use promise-based login instead of callback
        await new Promise((resolve, reject) => {
            req.login(registerUser, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        
        req.flash("success", "Well Come To Airbnb Clone");
        return res.redirect("/listings");
    }
    catch(e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
   return  res.render("users/login.ejs")
};

module.exports.login = async (req, res) => {
    req.flash("success", "Wellcome Back Airbnb Clone!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl);
};
module.exports.logout = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            req.logout((err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        req.flash("success", "You are logged out.");
        return res.redirect("/listings");
    } catch (err) {
        return next(err);
    }
};