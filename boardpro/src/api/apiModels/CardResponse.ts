import {UserResponse} from "./UserResponse";
import {CardListResponse} from "./CardListResponse";

export type CardResponse = {
    id: number;
    title: string;
    description: string;
    executors: UserResponse[];
    orderNumber: number;
    cardList: CardListResponse

};