import { Account } from "./account.model";

export class Payee {

  constructor(
    public _id: string,
    public rut: string,
    public name: string,
    public email: string,
    public phoneNumber: number,
    public accounts? : Account[]
  ){}

}
