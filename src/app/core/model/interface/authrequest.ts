export interface Authrequest {
    username:string;
    email:string;
    password:string;
    role:'USER' | 'OWNER' | 'ADMIN';

}
