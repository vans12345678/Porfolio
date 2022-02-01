/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: Index controller to export website pages
*/
import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
import * as EmailValidator from 'email-validator';

// create the User Model Instance
import User from '../Models/user';

// Util Functions
import { UserDisplayName } from '../Util/index';

// Display Page Functions
export function DisplayHomePage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)});
}

export function DisplayAboutPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'About Me', page: 'about', displayName: UserDisplayName(req)});
}

export function DisplayServicesPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Services', page: 'services', displayName: UserDisplayName(req)});
}

export function DisplayProjectsPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Projects', page: 'projects', displayName: UserDisplayName(req)});
}

export function DisplayLoginPage(req:Request, res:Response, next:NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', 
        { 
            title: 'Login', 
            page: 'login', 
            messages: req.flash('loginMessage'),
            displayName: UserDisplayName(req)   
        });
    }

    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    if(req.user == null)
    {
        return res.render('index', 
        { 
            title: 'Register', 
            page: 'register', 
            messages: req.flash('registerMessage'),
            displayName: UserDisplayName(req)
        });
    }

    return res.redirect('/contact-list');
}

// Process Page Functions

export function ProcessLoginPage(req:Request, res:Response, next:NextFunction): void
{
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        // are the login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            // are there DB errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }

            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

export function ProcessRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName 
    });

    let firstName = req.body.FirstName;
    let lastName = req.body.LastName;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let emailAddress = req.body.EmailAddress;



    User.register(newUser, password, (err) => 
    {
        if(firstName == "" || String(firstName).length < 2)
        {
            req.flash('registerMessage', 'Registration Error First Name: ' + firstName);
            return res.redirect('/register');
        }
        if(lastName == "" || String(lastName).length < 2)
        {
            req.flash('registerMessage', 'Registration Error Last Name: ' + lastName);
            return res.redirect('/register');
        }

        if(err || newUser == null)
        {
            console.error(err);
            req.flash('registerMessage', err.name);
            return res.redirect('/register');
        }
        if(!EmailValidator.validate(emailAddress))
        {
            console.error(err);
            req.flash('registerMessage', 'Registration Error Email Format: '+ emailAddress);
            console.error(EmailValidator.validate(emailAddress))
            return res.redirect('/register');
        }
        if(password != confirmPassword)
        {
            console.error(err);
            req.flash('registerMessage', 'Registration Error Passwords must match ');
            return res.redirect('/register');
        }

        // automatically login the user
        return passport.authenticate('local')(req, res, ()=>
        {
            return res.redirect('/contact-list');
        });
        
    });


}

export function ProcessLogoutPage(req:Request, res:Response, next:NextFunction): void
{
    req.logout();
    console.log("User Logged Out");
    res.redirect('/login');
}

export function ProcessContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)});
}

