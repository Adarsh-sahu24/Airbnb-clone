const User = require("../models/user");

module.exports.renderSignupForm = (req,res) => {
    res.render("./users/signup.ejs");
};

module.exports.signupUser = async(req,res) => {
    try{
        let{username,email,password} = req.body;
        const newUser = new User({username,email});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res) => {
    res.render("./users/login.ejs");
};

module.exports.loginUser =  async(req,res) => {
    req.flash("success","You are successfully logged in");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete res.locals.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","You are successfully logged out");
        res.redirect("/listings");
    });
};