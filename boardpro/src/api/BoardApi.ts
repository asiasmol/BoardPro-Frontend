import {BoardRequest} from "./apiModels/BoardRequest";
import {authorizedApi} from "../hooks/withAxiosIntercepted";

export class BoardApi {
    static createBoard = async (request: BoardRequest) =>
        await authorizedApi.post("http://localhost:8080/api/board", request);

    static getBoards = async () =>
        await authorizedApi.get("http://localhost:8080/api/board/all");

    static getBoard = async (param: { boardId: string }) =>
        await authorizedApi.get(`http://localhost:8080/api/board/${param.boardId}`);

    static addUser = async (param: { userEmail: string | undefined, boardId: number | undefined; }) =>
        await authorizedApi.patch(`http://localhost:8080/api/board/add-user?userEmail=${param.userEmail}&boardId=${param.boardId}`);

    static removeUser = async (param: { userEmail: string | undefined, boardId: number | undefined; }) =>
        await authorizedApi.delete(`http://localhost:8080/api/board/remove-user?userEmail=${param.userEmail}&boardId=${param.boardId}`);
}