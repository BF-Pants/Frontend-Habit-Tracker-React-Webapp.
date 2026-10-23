import {jwtDecode} from "jwt-decode";


export function isTokenValid(token) {

    const decodedToken = jwtDecode(token);
    const expUnix = decodedToken.exp;

    const now = new Date().getTime();
    const nowInUnix = Math.round(now / 1000);


    return expUnix - nowInUnix > 0;
}