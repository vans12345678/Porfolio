/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: Adds site routing for displaying page and processing pages
*/
// Express Configuration
import express from 'express';
const router = express.Router();
export default router;

//Create an index controller instance
import{DisplayAboutPage, DisplayHomePage, DisplayLoginPage, DisplayProjectsPage, DisplayRegisterPage, DisplayServicesPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage} from '../Controllers/index';


/* GET home page - with / */
router.get('/', DisplayHomePage);

/* GET home page - with /home */
router.get('/home', DisplayHomePage);

/* GET about page - with /about */
router.get('/about', DisplayAboutPage);
/* GET services page - with /services */
router.get('/services', DisplayServicesPage);

/* GET projects page - with /projects */
router.get('/projects', DisplayProjectsPage);

/* GET login page - with /login */
router.get('/login', DisplayLoginPage);

/* GET register page - with /register */
router.get('/register', DisplayRegisterPage);

/**************** Temporary routes for authentication and registration *********************/
/* Process login page - with /login */
router.post('/login', ProcessLoginPage);

/* Process logout page - with /logout */
router.get('/logout', ProcessLogoutPage);

/* Process register page - with /register */
router.post('/register', ProcessRegisterPage);
