import axios from "axios";
import { SignInRequest } from "../models/api/SignInRequest";
import { SignUpRequest } from "../models/api/SignUpRequest";
import { SignInResponse } from "../models/api/SignInResponse";

export class AuthApi {
    static signIn = async (request: SignInRequest) =>
        await axios.post<SignInResponse>("http://localhost:8080/api/v1/auth/authenticate", request);

    static signUp = async (request: SignUpRequest) =>
        await axios.post("http://localhost:8080/api/v1/auth/register", request);
}