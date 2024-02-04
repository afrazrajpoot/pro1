const express = require('express')
const router = express.Router()
const { upload } = require('../middleware/multer')
const { addMovie, getAllMovies, rating, like, dislike, comment, repliesComment } = require('../controller/movie.controller')
const { verfyToken } = require('../middleware/auth')

router.route('/addMovie').post(verfyToken,upload.single('thumbnail'),addMovie)
router.route('/getAllMovie').get(verfyToken,getAllMovies)
router.route('/rating/:id').post(verfyToken,rating)
router.route('/like/:id').post(verfyToken,like)
router.route('/dislike/:id').post(verfyToken,dislike)
router.route('/comment/:id').post(verfyToken,comment)
router.route('/replieComment/:id').post(verfyToken,repliesComment)

module.exports = router