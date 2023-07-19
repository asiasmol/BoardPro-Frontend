import { authorizedApi } from "../hooks/withAxiosIntercepted";
import {UserResponse} from "./apiModels/UserResponse";

export class UserApi {
    static getUser = async () =>
        await authorizedApi.get<UserResponse>("http://localhost:8080/api/user");

    static getAllUsers = async () =>
        await authorizedApi.get<UserResponse[]>("http://localhost:8080/api/user/all");



}