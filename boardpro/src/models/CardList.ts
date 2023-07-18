import { CardResponse } from "../api/apiModels/CardResponse";

export type CardList = {
    id: number;
    title: string;
    cards: CardResponse[] | [];
}