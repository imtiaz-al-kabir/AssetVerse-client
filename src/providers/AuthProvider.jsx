import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosInstance = axios.create({
        baseURL: 'https://asseet-vers-server.vercel.app',
        withCredentials: true
    });

    const checkUser = async () => {
        try {
            const { data } = await axiosInstance.get("/users/me");
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/users/login", { email, password });
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/users/register", userData);
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            await axiosInstance.post("/users/logout");
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (updatedData) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.put("/users/profile", updatedData);
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const authInfo = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        checkUser
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
