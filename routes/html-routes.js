// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    if (req.user) {
      //res.redirect("/profile");
      res.render("profile", {layout: "index"});
    } else{
    res.render("main", {layout: "index"});

    }
  });
  app.get("/create", (req, res) => {
    if(req.user){
      //res.redirect("/profile");
      res.render("profile", {layout: "index"});
    }
    res.render("create", {layout: "index"});
  });
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the profile page
    if (req.user) {
      //res.redirect("/profile");
      res.render("profile", {layout: "index"});
    }
    res.render("login", {layout: "index"});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile", {layout: "index"});
  });

  app.get("/search", isAuthenticated, (req, res) => {
    db.User.findAll({raw: true}).then((data) => {
      res.render("search",{
        user: data
      });
    });
    //res.render("search", {layout: "index"});
  });
};
