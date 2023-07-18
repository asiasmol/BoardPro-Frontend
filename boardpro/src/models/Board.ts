import {CardListResponse} from "../api/apiModels/CardListResponse";

export type  Board = {
    id: number;
    title: string;
    cardLists: CardListResponse[] | [];
}