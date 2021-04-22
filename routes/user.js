const express = require('express');
const router = express.Router();

const defaultRoute = require('../controllers/userControl');  // importing the user module
//const registerRoute = require('../controllers/userControl');
const requireLogin = require('../middleware/auth');
// defaulte route
router.all('/',defaultRoute.default);

// signup route
router.post('/signup', defaultRoute.register);

// login route
router.post('/login', defaultRoute.signin);

// route to view other profile
router.get('/profile/:_id',requireLogin,defaultRoute.otherProfile);

// router to follow users
router.put('/follow',requireLogin,defaultRoute.follow);

// route to unfollow
router.put('/unfollow',requireLogin,defaultRoute.unfollow);

// route to update the profile pic
router.put('/updatePic',requireLogin,defaultRoute.updatePic);

// route to search a user
router.post('/search-users',requireLogin,defaultRoute.search);
// exporting the router
module.exports=router;