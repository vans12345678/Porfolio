/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: User model based on user class
*/
import mongoose, { PassportLocalSchema } from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema
({
    username: String,
    emailAddress: String,
    displayName: String,
    created:
    {
        type:Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }

},
{
    collection: 'users'
});

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("User", UserSchema as PassportLocalSchema);
declare global
{
    export type UserDocument = mongoose.Document &
    {
        username: String,
        emailAddress: String,
        displayName: String
    }
}
export default Model;