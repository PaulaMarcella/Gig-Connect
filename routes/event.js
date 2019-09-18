'use strict';

const { Router } = require('express');
const router = Router();
const Event = require('../models/event');

const checkLogin = require('./../controllers/check-login');

//-------cloudinary configurations--------

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: '/gig-connect',
  allowedFormats: [ 'jpg', 'png' ]
});
const upload = multer({ storage });

//----------------------------------------

router.get('/event', checkLogin, (req, res, next) => {
    res.render('event/event');
    console.log(req.body);
});

router.post('/event', upload.single('file'), (req, res, next) => {
  // Creating an event
  // console.log("The event object:", req.body);
  const eventName = req.body.event;
  const description = req.body.description;
  const artists = req.body.artists;
  const genre = req.body.genre;
  const city = req.body.city; 
  const ticketURL = req.body.ticket; 
  const imageURL = req.file.url;
  const date = req.body.date;
  
  Event.create({
    eventName,
    description,
    artists,
    genre,
    city,
    ticketURL,
    imageURL,
    date
  })
  .then(event=>{
    res.redirect('/eventPage/' + event._id);
  })
  .catch(error=>{
    console.log(error);
  });
});

// Note: Whatever goes after ":"" in the route is being accessed
// with the same name in req.params.THENAME

router.get("/eventPage/:id", (req, res, next) => {
  console.log(req.params.id);
  Event.findById(req.params.id)
  .then((event) => {
    res.render('event/eventPage', {event});
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get("/eventPage/:id/edit", (req, res, next) => {
  console.log(req.params.id);
  Event.findById(req.params.id)
  .then((event) => {
    res.render('event/eventPage-edit', {event});
  })
  .catch((error) => {
    console.log(error);
  });
});


module.exports = router;