import {BoardRequest} from "../models/api/BoardRequest";
import {authorizedApi} from "../hooks/withAxiosIntercepted";
export class BoardApi {
    static createBoard = async (request: BoardRequest) =>
        await authorizedApi.post("http://localhost:8080/api/board", request);

    // static getBoard = async () =>
    //     await authorizedApi.get<BoardResponse>("http://localhost:8080/api/user");


}