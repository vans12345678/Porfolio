/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: Contact model based on contact class
*/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema
({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String
},
{
    collection: "contacts"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;

