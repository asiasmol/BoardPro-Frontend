import { authorizedApi } from "../hooks/withAxiosIntercepted";
import {UserResponse} from "./apiModels/UserResponse";

export const baseURL = "http://localhost:8080/api/user"
export class UserApi {
    static getUser = async () =>
        await authorizedApi.get<UserResponse>(`${baseURL}`);

    static getAllUsers = async () =>
        await authorizedApi.get<UserResponse[]>(`${baseURL}/all`);



}