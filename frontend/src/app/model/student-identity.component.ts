import {UserAccount} from "./user-account.component";

export interface StudentIdentity{
    id: number;
    created_at :string;
    deleted : boolean;
    secure_id : string;
    verification : boolean;
    address: string;
    birth_date: string;
    blood_type: string;
    first_name: string;
    gender:string;
    hobby: string;
    last_name: string;
    marital_status: string;
    middle_name: string;
    number_of_siblings: number;
    place_birth: string;
    religion: string;
    the_ordinal_number_child : number;
    user_account_id: UserAccount;
}