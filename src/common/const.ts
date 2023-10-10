import axios from "axios";
import jwt_decode from "jwt-decode";

export const appName = process.env.VUE_APP_NAME;
export const TOKEN_KEY = "goran_admin_token";
export const REFRESH_TOKEN_KEY = "goran_admin_refresh_token";
export const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export function request(url, method?, body?, headers?) {
    return axios({
        method: method || "get",
        url: `${SERVER_URL}/v1${url}`,
        headers: localStorage.getItem(TOKEN_KEY) ? {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            ...headers
        }: headers,
        data: body
    }).then(response => {
        return response.data;
    })
        .catch(err => {
            throw new Error((((err || {}).response || {}).data || {}).message || "Сервер временно недоступен");
        });
}

export function userId() {
    const token = localStorage.getItem(TOKEN_KEY);
    const id = (jwt_decode(token as any) as any).sub;
    return id;
}
