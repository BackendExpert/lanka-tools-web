import axios from "axios";
import { getDeviceId } from "../utils/deviceId";

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const deviceId = getDeviceId();

        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (config.headers?.set) {
            config.headers.set("x-device-id", deviceId);
        } else {
            config.headers = {
                ...config.headers,
                Authorization: accessToken
                    ? `Bearer ${accessToken}`
                    : undefined,
                "x-device-id": deviceId,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login") &&
            !originalRequest.url.includes("/auth/register")
        ) {

            originalRequest._retry = true;

            const refreshToken =
                localStorage.getItem("refresh_token");

            if (!refreshToken) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/";

                return Promise.reject(error);
            }

            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_APP_API}/auth/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                            "x-device-id": getDeviceId(),
                        },
                    }
                );

                const newAccessToken =
                    response.data.access_token;

                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return API(originalRequest);

            } catch (err) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default API;