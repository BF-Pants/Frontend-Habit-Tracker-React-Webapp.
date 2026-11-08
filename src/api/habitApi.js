import axios from "axios";


const baseUrl = "https://novi-backend-api-wgsgz.ondigitalocean.app/api"

export function getNoviHeader() {
    const token = localStorage.getItem("token");

    return {
        "novi-education-project-id": import.meta.env.VITE_NOVI_API_ID,
        Authorization: `Bearer ${token}`,
    };
}

export async function getHabitsApi(userId) {
    const response = await axios.get( `${baseUrl}/users/${userId}/habits`,
        {
            headers: getNoviHeader()
        }
    )
    return response.data;
}


export async function createHabitApi(newHabitData, userId) {
    const response = await axios.post( `${baseUrl}/habits`,
        {
            ...newHabitData, userId
        },
        {
            headers: getNoviHeader()
        }

        )
        return response.data;
}

export async function saveHabitsApi(habitId, data) {
    const response = await axios.put( `${baseUrl}/habits/${habitId}`,
        data,
        {
            headers: getNoviHeader()
        }
        )
    return response.data;
}

export async function deleteHabitApi(habitId) {
    const response = await axios.delete( `${baseUrl}/habits/${habitId}`,
        {
            headers: getNoviHeader()
        }
    )
    return response.data;
}