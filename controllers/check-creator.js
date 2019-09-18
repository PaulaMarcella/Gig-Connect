'use strict';

module.exports = (req, res, next) => {
  if (!req.event.creator === req.session.user._id) {
    throw new Error('You do not have permission to change the event');
  } else {
    next();
  }
};