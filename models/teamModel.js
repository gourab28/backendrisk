const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  position:  {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  twitter: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  telegram: {
    type: String,
    trim: true,
  },
  image : { 
    type: String
  },
  coverimage: { 
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
  
});

module.exports = mongoose.model("Team", TeamSchema);

