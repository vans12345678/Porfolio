"use strict";
var core;
(function (core) {
    class Contact {
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;
        }
        get FullName() {
            return this.m_fullName;
        }
        set FullName(value) {
            this.m_fullName = value;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set ContactNumber(value) {
            this.m_contactNumber = value;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(value) {
            this.m_emailAddress = value;
        }
        toString() {
            return `Full Name     : ${this.FullName} \nContact Number: ${this.ContactNumber}\nEmail Address : ${this.EmailAddress}`;
        }
        toJSON() {
            return {
                "FullName": this.FullName,
                "ContactNumber": this.ContactNumber,
                "EmailAddress": this.EmailAddress
            };
        }
        fromJSON(data) {
            this.FullName = data.FullName;
            this.ContactNumber = data.ContactNumber;
            this.EmailAddress = data.EmailAddress;
        }
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            else {
                console.error("One or more properties of the Contact is empty");
                return null;
            }
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map