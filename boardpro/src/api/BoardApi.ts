import {BoardRequest} from "./apiModels/BoardRequest";
import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {CardListResponse} from "./apiModels/CardListResponse";

export const baseURL = "http://localhost:8080/api/board"
export class BoardApi {
    static createBoard = async (request: BoardRequest) =>
        await authorizedApi.post(`${baseURL}`, request);

    static getBoards = async () =>
        await authorizedApi.get(`${baseURL}/all`);

    static getBoard = async (param: { boardId: string }) =>
        await authorizedApi.get(`${baseURL}/${param.boardId}`);

    static addUser = async (param: { userEmail: string | undefined, boardId: number | undefined; }) =>
        await authorizedApi.patch(`${baseURL}/add-user?userEmail=${param.userEmail}&boardId=${param.boardId}`);

    static removeUser = async (param: { userEmail: string | undefined, boardId: number | undefined; }) =>
        await authorizedApi.delete(`${baseURL}/remove-user?userEmail=${param.userEmail}&boardId=${param.boardId}`);

    static updateBoard = async (request: {
        cardLists: CardListResponse[] | [];
        title: string
    }, boardId: number | undefined) =>
        await authorizedApi.patch(`${baseURL}`, request, {
            params: {
                boardId: boardId
            },
        });
}