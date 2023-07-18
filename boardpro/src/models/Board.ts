import {CardListResponse} from "../api/apiModels/CardListResponse";
import {UserResponse} from "../api/apiModels/UserResponse";

export type  Board = {
    id: number;
    title: string;
    cardLists: CardListResponse[] | [];
    users: UserResponse[] | [];
}