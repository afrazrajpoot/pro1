const Movie = require("../models/movie.model")
const { uploadOnCloudinary } = require("../upload/cloudinary")
const { asyncHandler } = require("../utils/asyncHandler")
const CoustomError = require("../utils/coustomError")
exports.addMovie = asyncHandler(async(req,res,next)=>{
    const {title,releaseYear,genre,director,actors,user} = req.body
    const thumbnailPath = req.file?.path
    const thumbnail = await uploadOnCloudinary(thumbnailPath)
    const movie = await Movie.create({title,releaseYear,genre,director,actors,user,thumbnail:thumbnail?.url})
    res.status(201).json({
        success:true,
        data:movie
    })
})
exports.getAllMovies = asyncHandler(async(req,res,next)=>{
    const { genre, director, releaseYear, minRating, maxRating, title } = req.query;
    const query = {}
    if(genre) query.genre = {$regex: new RegExp(genre,'i')}
    
    if(director) query.director = director
    
    if(releaseYear) query.releaseYear = releaseYear
    
    if(minRating) query.rating = { $gte: minRating }
    
    if(maxRating) query.rating = { ...query.rating,$lte: maxRating }
    
    if (title) query.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive substring match
    const movies = await Movie.find(query).select('-ratings','-password').populate('user')
    console.log(req.query)
    res.status(200).json({
        success:true,
        data:movies
    })
})
exports.rating = asyncHandler(async(req, res, next)=>{
    const { rating } = req.body;
    const { id } = req.params;

    // Validate rating (assuming a rating scale from 1 to 10)
    if (rating < 1 || rating > 10) {
      return next(new CoustomError('invalid rating the rating must be between 1 to 10',404))

    }

    // Find the movie by ID
    const movie = await Movie.findById(id);

    if (!movie) {
      return next(new CoustomError('movie not found',404))
    }

    // Add the new rating to the ratings array
    movie.ratings.push(rating);

    // Recalculate the average rating
    const sum = movie.ratings.reduce((acc, r) => acc + r, 0);
    movie.rating = sum / movie.ratings.length;

    // Save the updated movie
    await movie.save();

    res.json({ message: 'Rating added successfully', movie });
})
exports.like = asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  const likedUser = req.user
  const movie = await Movie.findById(id)
  if(!movie){
    return next(new CoustomError("movie not found",400))
  }
  const isliked = movie?.likes.findIndex(user=>user?._id.toString()===likedUser?._id.toString())
  if(isliked !== -1){
    movie?.likes.splice( isliked, 1);
   
  }else{
    movie?.likes.push(likedUser);

  }
  
  await movie.save()
  res.status(200).json({
    success:true,
    data:movie
  })
});
exports.dislike = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const dislikedUser = req?.user
    // console.log(dislikedUser)
    const movie = await Movie.findById(id)
    if(!movie){
      return next(new CoustomError("movie not found",400))
    }
    const isDisliked = movie.dislikes.findIndex(user=>user?._id.toString()===dislikedUser?._id.toString())
    // console.log(isDisliked)
    // if(isDisliked){
    //  movie.dislikes.splice()
    // }
    if (isDisliked !== -1) {
        // User has already liked the movie, so remove the like
        movie.dislikes.splice(isDisliked, 1);
      } else {
        // User has not liked the movie, so add the like
        movie.dislikes.push(dislikedUser);
      }
    
    await movie.save()
    res.status(200).json({
      success:true,
      data:movie
    })
})
exports.comment = asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  const user = req?.user;
  const {text} = req.body;
  const movie = await Movie.findById(id)
  if(!movie){
    return next(new CoustomError("movie not found",400))
  }
  movie.comments.push({user:user, text:text})
  await movie.save()
  res.status(200).json({
    success:true,
    data:movie
  })
})
exports.repliesComment = asyncHandler(async(req,res,next)=>{
  const {cId,text} =req.body
  const {id} = req.params
  const movie = await Movie.findById({_id:id});
  if(!movie){
    return next(new CoustomError("comment not found",400))
  } 
  const comment = movie.comments.find(c=>c._id.toString()===cId.toString())
  // console.log(comment)
  if(!comment){
    return next(new CoustomError("comment not found",400))
  }
comment.replies.push({user:req?.user,text:text})
  // console.log(movie.comments.replies.length)
  await movie.save()
  res.status(200).json({
    success:true,
    data:comment
  })
})