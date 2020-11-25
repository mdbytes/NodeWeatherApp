const path = require("path");
const express = require("express");
const hbs = require("hbs");
const port = process.env.PORT || 3000;
const forecast = require("./utils/forecast");

const app = express();

// Define paths for exxpress config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up for handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static director to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Martin Dwyer",
    tagline: "Your instant weather resource",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    page: "About Us",
    message: "Here's a bit about who we are ...",
    name: "Martin Dwyer",
    tagline: "Your instant weather resource",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App",
    page: "Help Page",
    message: "We are here to help.  Let us know what you need!",
    tagline: "Your instant weather resource",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
  } else {
    forecast(req.query.address, (error, data) => {
      if (error) {
        res.send({
          error: error,
        });
      } else {
        res.send({
          location: data.location,
          time: data.time,
          icon: data.icon_url,
          forecast: data.forecast,
        });
      }
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Weather App",
    tagline: "Your instant weather resource",
    pagetitle: "404 Error",
    description: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
