'use strict';

const { Router } = require('express');
const router = Router();
const Event = require('../models/event');

router.get('/event', (req, res, next) => {
    res.render('event/event');
    console.log(req.body);
});

router.post('/event', (req, res, next) => {
  // Creating an event
  // console.log("The event object:", req.body);
  const eventName = req.body.event;
  const description = req.body.description;
  const genre = req.body.genre;
  const location = req.body.location; 
  const ticketURL = req.body.ticket; 
  const imageURL = req.body.image;
  
  Event.create({
    eventName,
    description,
    genre,
    location,
    ticketURL,
    imageURL
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

router.get("/eventPage/:id", (req,res,next) => {
  console.log(req.params.id);
  Event.findById(req.params.id)
  .then((event) => {
    res.render('event/eventPage', {event});
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router;