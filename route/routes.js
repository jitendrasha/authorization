const express = require('express')

const MovieCtrl = require('../controller/movie-controller')
const userController = require("../controller/user-controller");
const {authenticateApp} = require('../helper/jwthelper')

const router = express.Router()

router.post('/movie', MovieCtrl.createMovie)
router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/movies', MovieCtrl.getMovies)

router.post("/signup", userController.signUp);
router.post('/login', userController.login);
router.get("/getUserDeatl", authenticateApp(),userController.getUserDetails);

 


module.exports = router