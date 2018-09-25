// Any Login module has to implement the IUser interface to implement the login interface.
export interface IUser {
     email_id: String;
     password: String;
}

// Any Registration module has to implement the IRegister interface.
export interface IRegister{
    guid: String;    
    first_name: String;
    middle_name: String;
    last_name: String;
    email_id: String;
    password: String;
}