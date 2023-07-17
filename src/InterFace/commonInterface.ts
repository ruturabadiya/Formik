export interface IData{
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    dOB: string;
    gender:string;
    password: string;
    cPassword: string;
    [key: string]: any;
}