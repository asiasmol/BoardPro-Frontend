import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {CardListRequest} from "../models/api/CardListRequest";

export class CardListApi {

    static createCardList = async (request: CardListRequest, boardId: number | undefined) =>
        await authorizedApi.post("http://localhost:8080/api/cardList", request, {
            params: {
                boardId: boardId,
            },
        });

}