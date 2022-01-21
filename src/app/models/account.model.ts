import { Bank } from "../interfaces/bank.inteface";


export class Account{

  constructor(
    public _id: string,
    public bankId: string,
    public type: string,
    public number: number,
    public bankName?: string,
  ){}

}
