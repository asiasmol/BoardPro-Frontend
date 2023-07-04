import {CardResponse} from "./CardResponse";

export type CardListResponse = {
    id: number;
    title: string;
    cards: CardResponse[];
};