'use strict';

const { Router } = require('express');
const router = Router();
const Event = require('../models/event');

router.get('/', (req, res, next) => {
  Event.find()
  .then(eventList => {
    const data = {
      eventList
    };
    //console.log(data);
    res.render('index', data);
  })
  .catch(error => {
    next(error);
  });
});

router.get('/event-search', (req, res, next) => {
  const searchResult = req.query.city;
  console.log("QUERY RESULT", searchResult);
  Event.find({city: searchResult})
  .then(eventList => {
    const data = {
      eventList
    };
    console.log(data);
    res.render('index', data);
  })
  .catch(error => {
    next(error);
  });
});

// Previous versions below:

// router.get('/event-search', (req, res, next) => {
//   const searchResult = req.query.search;
//   //console.log("QUERY RESULT", searchResult);
//   Event.find({genre: searchResult})
//   .then(eventList => {
//     const data = {
//       eventList
//     };
//     console.log(data);
//     res.render('index', data);
//   })
//   .catch(error => {
//     next(error);
//   });
// });


// router.get('/event-search', (req, res, next) => {
//   //const searchResult = req.query.location;
//   //console.log("QUERY RESULT",searchResult);
//   const search = req.query.search;
//   Promise.all([
//     Event.find({ genre: search}),
//     Event.find({ city: search}) ])
//   .then([genre, city] => {
//     const data = {
//       genre,
//       city
//     };
//     //console.log("HIIII" + {eventList});
//     res.render('index', data);
//   })
//   .catch(error => {
//     next(error);
//   });
// });

module.exports = router;