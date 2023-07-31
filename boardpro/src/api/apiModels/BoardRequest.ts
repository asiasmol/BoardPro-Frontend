import {CardListResponse} from "./CardListResponse";

export type BoardRequest = {
    title: string;
    cardLists : CardListResponse[]
};