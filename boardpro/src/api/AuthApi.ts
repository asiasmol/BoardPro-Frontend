import axios from "axios";
import { SignInRequest } from "./apiModels/SignInRequest";
import { SignUpRequest } from "./apiModels/SignUpRequest";
import { SignInResponse } from "./apiModels/SignInResponse";

export const baseURL = "http://localhost:8080/api/v1/auth"
export class AuthApi {
    static signIn = async (request: SignInRequest) =>
        await axios.post<SignInResponse>(`${baseURL}/authenticate`, request);

    static signUp = async (request: SignUpRequest) =>
        await axios.post(`${baseURL}/register`, request);
}