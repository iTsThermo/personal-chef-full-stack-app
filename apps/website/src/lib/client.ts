import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

// Axios Client
export const axiosClient = axios.create({
    baseURL : `${import.meta.env.VITE_NODE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
})

// React Query Client
export const queryClient = new QueryClient();