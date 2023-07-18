import axios from "axios";
import { SignInRequest } from "./apiModels/SignInRequest";
import { SignUpRequest } from "./apiModels/SignUpRequest";
import { SignInResponse } from "./apiModels/SignInResponse";

export class AuthApi {
    static signIn = async (request: SignInRequest) =>
        await axios.post<SignInResponse>("http://localhost:8080/api/v1/auth/authenticate", request);

    static signUp = async (request: SignUpRequest) =>
        await axios.post("http://localhost:8080/api/v1/auth/register", request);
}