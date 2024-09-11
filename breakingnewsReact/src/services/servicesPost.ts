import axios from 'axios';


const baseUrl =  "https://api-breakingnews-s97m.onrender.com";


export async function GetAllPosts () {
    const response = await axios.get(`${baseUrl}/news/getAll`);
    return response.data;

}

export async function TopNews () {
    const response = await axios.get(`${baseUrl}/news/top`);
    return response.data;
}

export async function GetProfile (id: string) {
    const response = await axios.get(`${baseUrl}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
}


export async function GetUser () {
    const response = await axios.get(`${baseUrl}/news/byUser`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
}




