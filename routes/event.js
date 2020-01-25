"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../models/event");

const checkLogin = require("./../controllers/check-login");
const checkCreator = require("./../controllers/check-creator");

//-------cloudinary configurations--------

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "/gig-connect",
  allowedFormats: ["jpg", "png"]
});
const upload = multer({ storage });

//----------------------------------------

router.get("/event", checkLogin, (req, res, next) => {
  res.render("event/event");
  console.log(req.body);
});

router.post("/event", upload.single("file"), (req, res, next) => {
  // Creating an event
  //console.log("The event object:", req.body);
  // const eventName = req.body.event;
  const eventName =
    req.body.event.charAt(0).toUpperCase() +
    req.body.event.slice(1).toLowerCase();
  const description =
    req.body.description.charAt(0).toUpperCase() +
    req.body.description.slice(1).toLowerCase();
  const artistArray =
    req.body.artists.charAt(0).toUpperCase() +
    req.body.artists.slice(1).toLowerCase();
  const genreArray =
    req.body.genre.charAt(0).toUpperCase() +
    req.body.genre.slice(1).toLowerCase();
  const city =
    req.body.city.charAt(0).toUpperCase() +
    req.body.city.slice(1).toLowerCase();
  const ticketURL = req.body.ticket;
  const imageURL = req.file && req.file.url;
  const date = req.body.date;
  const creator = req.session.user._id;

  const artists = artistArray.split(",").map(item => item.trim());
  const genre = genreArray.split(",").map(item => item.trim());

  Event.create({
    eventName,
    description,
    artists,
    genre,
    city,
    ticketURL,
    imageURL,
    date,
    creator
  })
    .then(event => {
      //console.log(event);
      //res.render('event/eventPage', {event});
      res.redirect("/eventPage/" + event._id);
    })
    .catch(error => {
      console.log(error);
    });
});

// Note: Whatever goes after ":"" in the route is being accessed
// with the same name in req.params.THENAME

router.get("/eventPage/:id", checkLogin, (req, res, next) => {
  Event.findById(req.params.id)
    .populate("creator")
    .populate("comments.commentAuthor")
    .then(event => {
      console.log("POPULATED EVENT", event);

      res.render("event/eventPage", { event });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/eventPage/:id/edit", checkLogin, (req, res, next) => {
  // console.log(req.params.id);
  Event.findById(req.params.id)
    .then(event => {
      // console.log(event)
      res.render("event/eventPage-edit", { event });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/eventPage/:id/edit", (req, res, next) => {
  const eventName = req.body.event;
  const description = req.body.description;
  const artists = req.body.artists;
  const genre = req.body.genre;
  const city = req.body.city;
  const ticketURL = req.body.ticket;
  const date = req.body.date;
  const eventId = req.params.id;

  const data = {
    eventName,
    description,
    artists,
    genre,
    city,
    ticketURL,
    date
  };
  //console.log("DATA TO BE EDIT", data)

  Event.findByIdAndUpdate(eventId, data)
    .populate("creator")
    .then(event => {
      console.log(event);
      res.redirect("/eventPage/" + eventId);
    })
    .catch(error => {
      console.log("Could not update event information", error);
    });
});

router.get("/eventPage/:id/delete", (req, res, next) => {
  const eventId = req.params.id;
  // Grab the ID and use it as an argument for deleting
  Event.findByIdAndDelete(eventId)
    .then(() => {
      res.redirect("/browse");
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/add-comment/:id", checkLogin, (req, res, next) => {
  const commentBody = req.body.commentbody;
  const commentTitle = req.body.commenttitle;
  const commentAuthor = req.session.user._id;
  const eventId = req.params.id;

  // console.log("COMMENT DATA", data);
  Event.findByIdAndUpdate(eventId, {
    $push: {
      comments: {
        commentBody,
        commentTitle,
        commentAuthor
      }
    }
  })
    .then(() => {
      res.redirect("/eventPage/" + eventId);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/browse", (req, res, next) => {
  Event.find({})
    .then(eventList => {
      res.render("browse", { eventList });
    })
    .catch(error => {
      console.log(error);
    });
});

// app.get("/event-search", async (req, res) => {
//   try {
//     const query = req.query.search;
//     const type = req.query.type.toLowerCase();
//     const filteredEvents = await Event.find({ city: query }).exec();
//     res.render("browse", { eventList: filteredEvents });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.search;
    const type = req.query.type.toLowerCase();
    let filteredEvents;
    if (query === "") {
      filteredEvents = await Event.find({}).exec();
    } else if (type === "city") {
      filteredEvents = await Event.find({ city: query }).exec();
    } else if (type === "genre") {
      filteredEvents = await Event.find({ genre: query }).exec();
    } else if (type === "artists") {
      filteredEvents = await Event.find({ artists: query }).exec();
    }
    res.render("browse", { eventList: filteredEvents });
  } catch (error) {
    console.log(error);
  }
});

// let searchResult;
// if (req.query.search) {
//   searchResult =
//     req.query.search.charAt(0).toUpperCase() +
//     req.query.search.slice(1).toLowerCase();
// }
// //console.log("search result",searchResult);
// const typeResult = req.query.type;
// console.log(typeResult);
// Event.find({})
//   .then(allEvents => {
//     // console.log("ALL EVENTS",allEvents);
//     return allEvents.filter(event => event[typeResult] === searchResult);
//   })
//   .then(eventList => {
//     // console.log("FILTERED EVENTS",eventList);
//     const data = {
//       eventList
//     };
//     res.render("browse", data);
//   })
//   .catch(error => {
//     next(error);
//   });

module.exports = router;
