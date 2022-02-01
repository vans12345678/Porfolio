/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: User class
*/
namespace core
{
  export class User 
  {
    // Instance Variables
    private m_displayName: string;
    private m_emailAddress: string;
    private m_username: string;
    private m_password: string;

    // getters and setters
    get DisplayName() :string
    {
      return this.m_displayName;
    }
  
    set DisplayName(value:string) 
    {
      this.m_displayName = value;
    }
  
    get EmailAddress() :string
    {
      return this.m_emailAddress;
    }
  
    set EmailAddress(value:string) 
    {
      this.m_emailAddress = value;
    }

    get Username() :string
    {
      return this.m_username;
    }
  
    set Username(value:string) 
    {
      this.m_username = value;
    }

    get Password() :string
    {
      return this.m_password;
    }
  
    set Password(value:string) 
    {
      this.m_password = value;
    }
  
    // constructor

    /**
     * Creates an instance of User.
     * @param {string} [displayName=""]
     * @param {string} [emailAddress=""]
     * @param {string} [username=""]
     * @param {string} [password=""]
     */
    constructor(displayName = "", emailAddress = "", username = "", password="") 
    {
      this.DisplayName = displayName;
      this.EmailAddress = emailAddress;
      this.Username = username;
      this.Password = password;
    }

    // methods

    /**
     * This method overrides the built-in toString method for the User class
     *
     * @returns {string}
     */
    public toString() :string
    {
      return `Display Name     : ${this.DisplayName} \nEmail Address : ${this.EmailAddress} \nUsername : ${this.Username}`;
    }

    /**
     * This method returns a JSON object made up of the properties of the User class
     *
     * @returns {Object}
     */
    public toJSON(): Object
    {
      return {
        "DisplayName": this.DisplayName,
        "EmailAddress": this.EmailAddress,
        "Username": this.Username
      }
    }

    /**
     * This method takes a JSON data object and assigns the values to the User class properties
     *
     * @param {Object} data
     * @returns {void}
     */
    public fromJSON(data: any): void
    {
      this.DisplayName = data.DisplayName;
      this.EmailAddress = data.EmailAddress;
      this.Username = data.Username;
      this.Password = data.Password;
    }

    /**
     * This method converts the User into a comma-separated value string
     *
     * @returns {string}
     */
    public serialize(): string
    {
      if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
      {
        return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
      }
      else 
      {
        console.error("One or more properties of the User is empty");
        return null;
      }
    }

    /**
     * This method takes a comma-separated data string and assigns the values to the User class properties
     *
     * @param {string} data
     * @return {void}
     */
    public deserialize(data: string): void
    {
      let propertyArray = data.split(",");
      this.DisplayName = propertyArray[0];
      this.EmailAddress = propertyArray[1];
      this.Username = propertyArray[2];
    }
  }

}


