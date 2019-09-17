'use strict';

const { Router } = require('express');
const router = Router();

router.get('/event', (req, res, next) => {
    res.render('event/event');
    console.log(req.body);
  });

router.post('/event', (req, res) => {
  // Creating an event
  console.log("The event object:", req.body);
  // Redirecting to the route of the created event
  res.redirect('/aRoute/'+ "eventId");
});

router.get("/aRoute/:id",(req,res,next)=>{
  // req.params (Gets information from the url)
  // Find by id a specific event and render details
  res.render(/*A VIEW*/);
});

module.exports = router;