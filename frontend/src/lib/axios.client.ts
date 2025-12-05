import axios, { AxiosInstance } from 'axios';

interface CustomAxiosInstance extends AxiosInstance {
  setAccessToken: (token: string) => void;
}

let accessToken: string | null = null;

const generateIdempotencyKey = (): string => {
  const now = Date.now();
  return (now - (Math.floor(now / 3600000) * 3600000)).toString();
};

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    withCredentials: true,
}) as CustomAxiosInstance;

api.interceptors.request.use(config => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (['POST', 'PATCH', 'PUT'].includes(config.method?.toUpperCase() || '')) {
        config.headers['Idempotency-Key'] = generateIdempotencyKey();
    }

    return config;
});

api.interceptors.response.use(res => {
        const newToken = res.headers["x-access-token"];

        if (newToken) {
            accessToken = newToken;
        }

        return res;
    },
    err => {
        const res = err.response;

        if (res?.status === 401 && res?.code === "UNAUTHORIZED") {
            window.location.replace("/login");
            return Promise.reject(err);
        }

        return Promise.reject(err);
    }
);

// Only created this for cases I use SSR where I need to replace access token manually.
api.setAccessToken = (token: string) => {
    accessToken = token;
}

