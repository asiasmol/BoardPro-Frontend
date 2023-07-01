import {BoardRequest} from "../models/api/BoardRequest";
import {authorizedApi} from "../hooks/withAxiosIntercepted";

export class BoardApi {
    static createBoard = async (request: BoardRequest) =>
        await authorizedApi.post("http://localhost:8080/api/board", request);

    static getBoards = async () =>
        await authorizedApi.get("http://localhost:8080/api/board/all");

    static getBoard = async (param: { boardId: string }) =>
        await authorizedApi.get(`http://localhost:8080/api/board/${param.boardId}`);
}