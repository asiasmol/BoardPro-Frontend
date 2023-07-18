
import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {CardRequest} from "./apiModels/CardRequest";

export class CardApi {

    static createCard = async (request: CardRequest, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.post("http://localhost:8080/api/card", request, {
            params: {
                boardId: boardId,
                cardListId: cardListId
            },
        });

}