
import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {CardRequest} from "./apiModels/CardRequest";

export class CardApi {

    static createCard = async (request: {
        description: null;
        title: string;
        cardListId: number;
    }, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.post("http://localhost:8080/api/card", request, {
            params: {
                boardId: boardId,
                cardListId: cardListId
            },
        });

    static updateCard = async (request: CardRequest, cardId: number, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.patch("http://localhost:8080/api/card", request, {
            params: {
                cardId: cardId,
                boardId: boardId,
                cardListId: cardListId
            },
        });

    static deleteCard = async (cardId: number, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.delete("http://localhost:8080/api/card", {
            params: {
                cardId: cardId,
                boardId: boardId,
                cardListId: cardListId
            },
        });

}