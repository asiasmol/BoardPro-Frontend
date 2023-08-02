import {CardListResponse} from "./CardListResponse";
import {UserResponse} from "./UserResponse";

export type BoardResponse = {
    id : number;
    title: string;
    cardLists: CardListResponse[];
    users : UserResponse[];
    owner : UserResponse
    imagePath : string
};