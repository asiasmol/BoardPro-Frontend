import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {CardListRequest} from "./apiModels/CardListRequest";

export const baseURL = "http://localhost:8080/api/cardList"
export class CardListApi {

    static createCardList = async (request: CardListRequest, boardId: number | undefined) =>
        await authorizedApi.post(`${baseURL}`, request, {
            params: {
                boardId: boardId,
            },
        });

    static changeTitle = async (request: CardListRequest, boardId: number | undefined, cardListId: number | undefined) =>
        await authorizedApi.patch(`${baseURL}`, request, {
            params: {
                boardId: boardId,
                cardListId: cardListId
            },
        });

}