import {CardListResponse} from "./CardListResponse";

export type BoardResponse = {
    id : number;
    title: string;
    cardLists: CardListResponse[]
};