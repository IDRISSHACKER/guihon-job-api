import {Body} from "@nestjs/common";

export interface SeekerInterface{
 id?: string;
 name: string;
 surname: string;
 age: number;
 sex: string;
 avatar: string;
 phone: string;
 cni: string;
 email: string;
 cv: string;
}

export interface SeekerBody extends Body{
 name: string;
 surname: string;
 age: number;
 sex: string;
 avatar: string;
 phone: string;
 cni: string;
 email: string;
 cv: string;
}
