import {CardListResponse} from "./api/CardListResponse";

export type  Board = {
    boardId: number;
    title: string;
    cardLists: CardListResponse[] | [];
}