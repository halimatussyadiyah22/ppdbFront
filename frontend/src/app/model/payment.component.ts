import {UserAccount} from "./user-account.component";

export interface Payment{
    id: number;
    created_at :string;
    deleted : boolean;
    secure_id : string;
    verification : boolean;
    date_payment: string;
    description: string;
    payment_amount:number;
    payment_receipt_url: string;
    type_of_amount: string;
    user_account_id: UserAccount;
}