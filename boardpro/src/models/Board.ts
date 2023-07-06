import {CardListResponse} from "./api/CardListResponse";

export type  Board = {
    id: number;
    title: string;
    cardLists: CardListResponse[] | [];
}