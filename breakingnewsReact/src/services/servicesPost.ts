import axios from 'axios';


const baseUrl =  "https://api-breakingnews-s97m.onrender.com";


export async function GetAllPosts () {
    const response = await axios.get(`${baseUrl}/news/getAll`);
    return response.data;

}

