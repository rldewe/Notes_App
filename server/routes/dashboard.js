const express = require('express');
const router = express.Router();
const {isLoggedIn}=require('../middleware/checkAuth.js')
const dashboardController = require('../controllers/dashboardController');

/**
 * App Routes 
*/
router.get('/dashboard',isLoggedIn, dashboardController.home);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
//router.delete('/dashboard/delete-item/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
router.get('/dashboard/add',isLoggedIn,dashboardController.dashboardAddNote);
router.post('/dashboard/add',isLoggedIn,dashboardController.dashboardSubmitNote);

module.exports = router;