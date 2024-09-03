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

export async function SearchNow(title: string) {
    const response = await axios.get(`${baseUrl}/news/search?title=${title}`);
    return response.data;
}


