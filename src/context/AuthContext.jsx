import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {getUserDataApi} from "../api/authApi.js";
import {isTokenValid} from "../helper/isTokenValid.js";


export const AuthContext = createContext({});
const token= localStorage.getItem("token");

function AuthContextProvider({ children }) {
    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuth: false,
        user: null,
        status: 'done',
    });

    const navigate = useNavigate();



    useEffect(() => {
        if (token && isTokenValid(token)) {
            const decodedToken =  jwtDecode(token);
            void getUserData(decodedToken.userId, token)
            } else {
                toggleIsAuthenticated({
                    ...isAuthenticated,
                    status: 'done'
                })
                navigate('/');
            }
        }, [])

    async function getUserData(id, token, redirectUrl) {
        try {
            const userData = await getUserDataApi(id);

            toggleIsAuthenticated({
                ...isAuthenticated,
                isAuth: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    userId: userData.id,
                },
                status: 'done',
            })
            if (redirectUrl) {
                navigate( redirectUrl )
            }

        } catch (e) {
            console.error(e)
            toggleIsAuthenticated({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
        }




    function loggingIn(userDetails) {
        localStorage.setItem("token", userDetails.token);
        const decodedToken =  jwtDecode(userDetails.token);
        void getUserData(decodedToken.userId, userDetails.token, '/home');
    }

    function loggingOut() {
        localStorage.clear()
        toggleIsAuthenticated({
            isAuth: false,
            status: 'done',
            user: null,
        });
        navigate('/');
    }



    const data = {
        isAuth: isAuthenticated,
        login: loggingIn,
        logout: loggingOut,
        token,
    };

    return (
        <AuthContext.Provider value={data}>
            {isAuthenticated.status === 'done'?  children : "loading.."}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;