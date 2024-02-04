const mongoose = require('mongoose');

// Define a Movie Schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
  thumbnail: { type: String }, // Image URL or file path
  // Add more fields as needed
  ratings: [{ type: Number, min: 1, max: 10 }],
  rating: { type: Number, min: 0, max: 10 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    replies:[
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String }
      }
    ]
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
