/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: Contact-list controller to export contact-list CRUD functions
*/
import express, { Request, Response, NextFunction } from 'express';

// Contact Model
import Contact from "../Models/contact";

// Util Functions
import { UserDisplayName } from '../Util/index';


// display page functions
export function DisplayContactListPage(req:Request, res:Response, next:NextFunction):void
{
    // db.contacts.find()
    Contact.find(function(err, contacts){
        if(err)
        {
        return console.error(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: UserDisplayName(req) });
    });
}

export function DisplayEditPage(req:Request, res:Response, next:NextFunction):void
{
    let id = req.params.id;

  // pass the id to the db

  // db.contacts.find({"_id": id})
  Contact.findById(id, {}, {}, (err, contactToEdit) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: UserDisplayName(req)});
  });
}

export function DisplayAddPage(req:Request, res:Response, next:NextFunction):void
{
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: UserDisplayName(req) });
}

// process page functions

export function ProcessEditPage(req:Request, res:Response, next:NextFunction):void
{
    let id = req.params.id;

  // instantiate a new Contact
  let updatedContact = new Contact
  ({
    "_id": id,
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  // db.contacts.update({"_id":id} and then update)
  Contact.updateOne({_id: id}, updatedContact, {}, (err) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}

export function ProcessAddPage(req:Request, res:Response, next:NextFunction):void
{
    // instantiate a new Contact
  let newContact = new Contact
  ({
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  // db.contacts.insert({contact data is here...})
  Contact.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}

export function ProcessDeletePage(req:Request, res:Response, next:NextFunction):void
{
    let id = req.params.id;

  // db.contacts.remove({"_id: id"})
  Contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}
