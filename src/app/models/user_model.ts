// Any Login module has to implement the IUser interface to implement the login interface.
export interface IUser {
     email: string;
     password: string;
}

// Any Registration module has to implement the IRegister interface.
export interface IUserData{
    uid: String;    
    first_name: string;
    middle_name: string;
    last_name: string;
    email: String;
    password?: String;
    role?: string;
}

export interface IRegister{
    guid: string;    
    first_name: string;
    middle_name: string;
    last_name: string;
    email_id: string;
    password: string;
    role?: string;
    uid: string;
}