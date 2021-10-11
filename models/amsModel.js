const mongoose = require("mongoose");

const amaSchema = mongoose.Schema({
  ama_id: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  type: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  pub: {
    type: String,
    default: 'publish',
    enum: ['draft','unpublish', 'publish'],
  },
  host: {
    type: String,
    trim: true,
  },
  image : { type: String},
  createdAt: {
    type: Date,
    default: Date.now()
  }
  
});

module.exports = mongoose.model("Ama", amaSchema);

