'use strict';

const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    commentbody: { type: String},
    commenttitle: { type:String},
    author: { type: String}
});

module.exports = mongoose.model('Comment', commentSchema);
