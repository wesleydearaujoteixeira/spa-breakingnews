import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";
import { CardBody, CardSection} from "./CardStyles.ts";
import { useState, useEffect } from "react";
import { GetAllPosts} from "../../services/servicesPost.ts";
import { TextLimited } from "../TextLimited/TextLimited.tsx";
import '../../components/../pages/Home/card.css';
import style from './card.module.css';
import { useNavigate } from "react-router-dom";


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

    const navigate = useNavigate();

    const token =  localStorage.getItem('token') || '';

    useEffect(() => {
        GetAllPosts().then((response) => {
            setNews(response.results); // Ajuste conforme a resposta da API
        }).catch((error) => {
            console.log(error);
        });


    }, []);

    const LikesAndComments = (postId: string) => {
        console.log('Você não pode curtir este post');
        navigate(`/likesAndComments/${postId}`);
    }


    return (
        <>
        
        {
            news.map((post) => (
                <div className="section" key={post.id}>
                <CardSection >
                
                
                {!token && <span>  </span>}
                        {token && <span
                        className={style.likesComments} 
                        onClick={() => LikesAndComments(post?.id)}> Ver postagem  </span>} 


                    <CardBody>
                        <div className={style.cardContent} >
                            <h3>{post.title}</h3>
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
