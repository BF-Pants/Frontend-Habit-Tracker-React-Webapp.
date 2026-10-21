import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";


export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuth: false,
        user: null,
        status: 'done',
    });

    const navigate = useNavigate();



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken =  jwtDecode(token);
            // zo ja -> haal data op en vul hiermee de state.
            toggleIsAuthenticated({
                isAuth: true,
                status: 'done'

            })
            async function getUserData() {
                try {
                    const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${decodedToken.userId}`,
                        {
                            headers: {
                                'novi-education-project-id': '39cb5325-95c1-4319-a258-146625bf33ea',
                                Authorization: `Bearer ${token}`,
                            },

                        });

                    toggleIsAuthenticated({
                        ...isAuthenticated,
                        isAuth: true,
                        user: {
                            id: decodedToken.userId,
                            email: decodedToken.email,
                        },
                        status: 'done',
                    })
                    console.log(response)

                } catch (e) {
                    console.error(e)
                    toggleIsAuthenticated({
                        isAuth: false,
                        user: null,
                        status: 'done'
                    });
                }
            }
            } else {
                toggleIsAuthenticated({
                    ...isAuthenticated,
                    status: 'done'
                })
            }
        }, []) // <----- lege array betekent mounting effect






    function loggingIn(userDetails) {

        localStorage.setItem("token", userDetails.token);
        toggleIsAuthenticated({
            isAuth: true,
            status: 'done',
            user: {
                email: userDetails.user.email,
                id: userDetails.user.id,
            }
        });

        navigate('/home');
    }

    function loggingOut() {
        localStorage.removeItem("token");
        console.log("User has logged out!");
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
    };

    return (
        <AuthContext.Provider value={data}>
            {isAuthenticated.status === 'done'?  children : "loading.."}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;