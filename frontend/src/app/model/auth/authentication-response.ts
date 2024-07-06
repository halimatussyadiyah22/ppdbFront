import {RegisterDTO} from "../register/register-dto";

export interface AuthenticationResponse {
    token?: string;
    registerDTO: RegisterDTO;
}