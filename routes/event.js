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
  console.log("The event object:", req.body);
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
  });

  // TODO 01
  // Find the event in the DB, it's id, and redirect to route


  // Redirecting to the route of the created event through id (route + eventId)
  res.redirect('/eventPage/');
});

router.get('/eventPage', (req, res, next) => {
  res.render('event/eventPage');
  //console.log(req.body);
});

router.get('/eventPage', (req, res, next) => {
  Event.findById({_id: req.query})
    .then((event) => {
      //res.render('/event/eventPage');
      console.log(event);
    })
    .catch((error) => {
      console.log(error);
    });
});


// TODo 02
// router.get("/aRoute/:id",(req,res,next)=>{
//   // req.params (Gets information from the url)
//   // Find by id a specific event and render details
//   res.render(/*A VIEW*/);
// });

module.exports = router;