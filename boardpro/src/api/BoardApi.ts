import {BoardRequest} from "../models/api/BoardRequest";
import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {BoardResponse} from "../models/api/BoardResponse";
export class BoardApi {
    static createBoard = async (request: BoardRequest) =>
        await authorizedApi.post("http://localhost:8080/api/board", request);

    static getBoard = async () =>
        await authorizedApi.get("http://localhost:8080/api/board");


}