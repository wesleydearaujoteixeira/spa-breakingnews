import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";
import { CardBody, CardSection} from "./CardStyles.ts";
import { useState, useEffect } from "react";
import { GetAllPosts} from "../../services/servicesPost.ts";
import { TextLimited } from "../TextLimited/TextLimited.tsx";
import '../../components/../pages/Home/card.css';

interface Like {
    _id: string;
    userId: string;
    created: string; // Pode ser um Date em alguns casos, mas se for um string ISO 8601, mantenha como string.
}

interface Comment {
    userId: string;
    text: string;
    _id: string;
    created: string; // Pode ser um Date em alguns casos, mas se for um string ISO 8601, mantenha como string.
}

interface Post {
    id: string;
    title: string;
    text: string;
    banner: string;
    createdAt: string; // Pode ser um Date em alguns casos, mas se for um string ISO 8601, mantenha como string.
    likes: Like[];
    comments: Comment[];
}

/* 

{
  "news": {
    "id": "66d0f9a14f8ba74ab52374a0",
    "title": "Only fans",
    "text": "Key Alves promete Only em 2024",
    "banner": "https://images.virgula.me/2023/09/anyconv-com__captura-de-tela-2023-04-11-082258-1.webp",
    "likes": [
      {
        "userId": "66d0f587dddd302c86246256",
        "created": "2024-08-29T22:44:19.459Z",
        "_id": "66d0f9c34f8ba74ab52374b0"
      }
    ],
    "comments": [],
    "username": "romildo1010",
    "avatar": "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }
}


*/



export default function Card() {

    const [news, setNews] = useState <Post[]> ([]);

  

    useEffect(() => {
        GetAllPosts().then((response) => {
            setNews(response.results); // Ajuste conforme a resposta da API
        }).catch((error) => {
            console.log(error);
        });


    }, []);

    return (
        <>
        
        {
            news.map((post) => (
                <div className="section" key={post.id}>
                <CardSection >
                    <CardBody>
                        <div>
                            <h2>{post.title}</h2>
                            <img src={post.banner} alt="" />
                        </div>
                        <p> <TextLimited text={post.text} limit={50}/>  </p>
                    </CardBody>
                    <article>
                        <FaRegThumbsUp />
                        <span> {post?.likes.length} </span>
                        <MdOutlineTextsms />
                        <span> {post?.comments.length} </span>
                    </article>
                </CardSection>
                </div>
            ))
            
            }
        </>
    );
}
