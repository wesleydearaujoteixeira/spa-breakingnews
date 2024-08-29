import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";
import { CardBody, CardSection } from "./CardStyles.ts";
import { useState, useEffect } from "react";
import { GetAllPosts } from "../../services/servicesPost.ts";
import { TextLimited } from "../TextLimited/TextLimited.tsx";

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

export default function Card() {

    const [news, setNews] = useState <Post[]> ([]);

    useEffect(() => {
        GetAllPosts().then((response) => {
            console.log(response);
            setNews(response.results); // Ajuste conforme a resposta da API
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            {
            news.map((post) => (
                <CardSection key={post.id}>
                    <CardBody>
                        <div>
                            <h2>{post.title}</h2>
                            <p> <TextLimited text={post.text} limit={50}/>  </p>
                        </div>
                        <img src={post.banner} alt="" />
                    </CardBody>
                    <article>
                        <FaRegThumbsUp />
                        <span> {post?.likes.length} </span>
                        <MdOutlineTextsms />
                        <span> {post?.comments.length} </span>
                    </article>
                </CardSection>
            ))
            
            }
        </>
    );
}
