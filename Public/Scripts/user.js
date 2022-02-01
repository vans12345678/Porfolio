"use strict";
var core;
(function (core) {
    class User {
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }
        get DisplayName() {
            return this.m_displayName;
        }
        set DisplayName(value) {
            this.m_displayName = value;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(value) {
            this.m_emailAddress = value;
        }
        get Username() {
            return this.m_username;
        }
        set Username(value) {
            this.m_username = value;
        }
        get Password() {
            return this.m_password;
        }
        set Password(value) {
            this.m_password = value;
        }
        toString() {
            return `Display Name     : ${this.DisplayName} \nEmail Address : ${this.EmailAddress} \nUsername : ${this.Username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            };
        }
        fromJSON(data) {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }
        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "") {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            else {
                console.error("One or more properties of the User is empty");
                return null;
            }
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map