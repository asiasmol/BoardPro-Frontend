import {useContext, useEffect, useState} from "react";
import axios, { InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/UserContext";


// pokazać najpierw na dwóch komponentach z route i console logu w useEffect - kompozycja pozwalająca przekształcić komponent
// w inny komponent, reużywać logiki

export const authorizedApi = axios.create();

export function withAxiosIntercepted<T extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<T>
) {
    return function AxiosIntercepted(props: T) {
        const navigate = useNavigate();
        const [isInitialized, setIsInitialized] = useState<boolean>(false);
        const {currentUserModifier} = useContext(UserContext);


        useEffect(() => {
            axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
                return {
                    ...config,
                    baseURL: process.env.REACT_APP_API_URL,
                };
            });

            authorizedApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
                if (config?.headers) {
                    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
                        ACCESS_TOKEN
                    )}`;
                }

                return {
                    ...config,
                    baseURL: process.env.REACT_APP_API_URL,
                };
            });
            authorizedApi.interceptors.response.use(
                (response) => {
                    return response;
                },
                (error) => {
                    if (error.response.status === 401) {
                        currentUserModifier(null);
                        localStorage.removeItem('ACCESS_TOKEN')
                        localStorage.removeItem("currentUser")
                        navigate("/login");
                        window.location.reload()
                    }

                    return Promise.reject(error);
                }
            );

            setIsInitialized(true);
        }, [navigate]);

        return isInitialized ? <Component {...props} /> : <></>;
    };
}