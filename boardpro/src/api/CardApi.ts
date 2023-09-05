
import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {CardRequest} from "./apiModels/CardRequest";
import {CardSwapRequest} from "./apiModels/CardSwapRequest";

export const baseURL = "http://localhost:8080/api/card"

export class CardApi {

    static createCard = async (request: {
        description: null;
        title: string;
        cardListId: number;
    }, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.post(`${baseURL}`, request, {
            params: {
                boardId: boardId,
                cardListId: cardListId
            },
        });

    static updateCard = async (request: CardRequest, cardId: number, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.patch(`${baseURL}`, request, {
            params: {
                cardId: cardId,
                boardId: boardId,
                cardListId: cardListId
            },
        });

    static deleteCard = async (cardId: number, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.delete(`${baseURL}`, {
            params: {
                cardId: cardId,
                boardId: boardId,
                cardListId: cardListId
            },
        });

    static addUser = async (param: { cardId: number | undefined,  cardListId: number | undefined, boardId: number | undefined, userEmail: string | undefined; }) =>
        await authorizedApi.patch(`${baseURL}/add-executors?cardId=${param.cardId}&boardId=${param.boardId}&cardListId=${param.cardListId}&userEmail=${param.userEmail}`);

    static swapCard = async (requests: CardSwapRequest[], boardId: number | undefined) =>
        await authorizedApi.patch(`${baseURL}/swap`, requests, {
            params: {
                boardId: boardId
            },
        });
}