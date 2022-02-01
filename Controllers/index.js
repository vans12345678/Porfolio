"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessContactPage = exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.DisplayRegisterPage = exports.DisplayLoginPage = exports.DisplayProjectsPage = exports.DisplayServicesPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const EmailValidator = __importStar(require("email-validator"));
const user_1 = __importDefault(require("../Models/user"));
const index_1 = require("../Util/index");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, index_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Me', page: 'about', displayName: (0, index_1.UserDisplayName)(req) });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: (0, index_1.UserDisplayName)(req) });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayProjectsPage(req, res, next) {
    res.render('index', { title: 'Projects', page: 'projects', displayName: (0, index_1.UserDisplayName)(req) });
}
exports.DisplayProjectsPage = DisplayProjectsPage;
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render('index', {
            title: 'Login',
            page: 'login',
            messages: req.flash('loginMessage'),
            displayName: (0, index_1.UserDisplayName)(req)
        });
    }
    return res.redirect('/contact-list');
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (req.user == null) {
        return res.render('index', {
            title: 'Register',
            page: 'register',
            messages: req.flash('registerMessage'),
            displayName: (0, index_1.UserDisplayName)(req)
        });
    }
    return res.redirect('/contact-list');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
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
    user_1.default.register(newUser, password, (err) => {
        if (firstName == "" || String(firstName).length < 2) {
            req.flash('registerMessage', 'Registration Error First Name: ' + firstName);
            return res.redirect('/register');
        }
        if (lastName == "" || String(lastName).length < 2) {
            req.flash('registerMessage', 'Registration Error Last Name: ' + lastName);
            return res.redirect('/register');
        }
        if (err || newUser == null) {
            console.error(err);
            req.flash('registerMessage', err.name);
            return res.redirect('/register');
        }
        if (!EmailValidator.validate(emailAddress)) {
            console.error(err);
            req.flash('registerMessage', 'Registration Error Email Format: ' + emailAddress);
            console.error(EmailValidator.validate(emailAddress));
            return res.redirect('/register');
        }
        if (password != confirmPassword) {
            console.error(err);
            req.flash('registerMessage', 'Registration Error Passwords must match ');
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/contact-list');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logout();
    console.log("User Logged Out");
    res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
function ProcessContactPage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, index_1.UserDisplayName)(req) });
}
exports.ProcessContactPage = ProcessContactPage;
//# sourceMappingURL=index.js.map