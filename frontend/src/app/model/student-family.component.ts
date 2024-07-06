import {StudentIdentity} from "./student-identity.component";

export interface StudentFamily{
    id: number;
    created_at :Date;
    deleted : boolean;
    secure_id : string;
    verification : boolean;
    father_age : number;
    father_education : string;
    father_job : string;
    father_name : string;
    mother_age : number;
    mother_education : string;
    mother_job : string;
    mother_name : string;
    student_identity: StudentIdentity;
}