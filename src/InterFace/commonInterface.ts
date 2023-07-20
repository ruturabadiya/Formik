export interface IData {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    dOB: Date;
    gender: string;
    password: string;
    cPassword: string;
    [key: string]: string | number | Date; // Index signature
  }
  