import { AxiosRequestConfig } from "axios";

export default class APIConfig {

    static readonly HOST_URL: string = 'http://localhost:8080';

    static readonly JSON_CONTENT_TYPE_CONFIG: AxiosRequestConfig = {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`
            "Content-Type": "application/json"
        }
    }
}

