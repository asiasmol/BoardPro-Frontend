import {UserResponse} from "./UserResponse";

export type CardResponse = {
    id: number;
    title: string;
    description: string;
    executors: UserResponse[];

};