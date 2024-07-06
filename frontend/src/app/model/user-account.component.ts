import {Role} from "./role.component";

export interface UserAccount{
    id: number;
    created_at :string;
    deleted : boolean;
    secure_id : string;
    email:string;
    full_name: string;
    is_enabled: boolean;
    id_locked: boolean;
    is_using_mfa: boolean;
    password: string;
    phone_number: string;
    role_id: Role;
}