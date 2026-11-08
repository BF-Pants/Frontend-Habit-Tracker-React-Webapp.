import axios from 'axios';


const baseUrl = "https://novi-backend-api-wgsgz.ondigitalocean.app/api"
export function getNoviHeader() {
    const token = localStorage.getItem("token");

    return {
        "novi-education-project-id": import.meta.env.VITE_NOVI_API_ID,
        Authorization: `Bearer ${token}`,
    };
}
export async function getUserDataApi(id) {
    const response =  await axios.get(`${baseUrl}/users/${id}`,
        {
            headers: getNoviHeader(),
        }
    )
    return response.data;
}