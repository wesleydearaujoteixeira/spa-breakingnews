import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetInfo, LikesApi } from "../../services/servicesPost";
import styles from './GetInformation.module.css';
import { FaRegThumbsUp } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';



// Definindo o esquema de validação com Zod
const schema = z.object({
  text: z.string().min(1,'Comentario em branco não pode'),
});

type FormInputs = z.infer<typeof schema>;



export const GetInformation = () => {


    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
      });


      const onSubmit: SubmitHandler <FormInputs> = async (data) => {

        try {
          const response = await axios.patch(`https://api-breakingnews-s97m.onrender.com/news/comments/${id}`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          console.log(response.data.message);
          alert(response.data.message);
          navigate('/home');

          return response.data;
    
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Erro ao enviar dados:', error.response?.data);
          } else {
            console.error('Erro inesperado:', error);
          }
        }
      };



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
    
    interface News {
        id: string;
        title: string;
        text: string;
        banner: string;
        likes: Like[];
        comments: Comment[];
        username: string;
        avatar: string;
    }


    const {id} = useParams();
    const idUser = localStorage.getItem('id') || '';

    const [news, setNews] = useState<News | null>({

        id: '',
        title: '',
        text: '',
        banner: '',
        likes: [],
        comments: [],
        username: '',
        avatar: ''
    });


    const [comments, setComments] = useState<Comment[] | null> ([]);

    useEffect(() => {
        GetInfo(id).then((response) => {
            console.log(response.news);
            setNews(response.news);
            setComments(response.news.comments);

        }).catch((err) =>  console.log(err));
    }, [id]);



    const LikedOnPost = () => {
        LikesApi(id, idUser).then((response) => {
            console.log(response.message);
            navigate('/home');

            
        }).catch((err) => {
            alert(err)
            console.log(err);
        })
    }

    const DeleteComment = (idNews: string | undefined, idComment: string) => {

        axios.patch(`https://api-breakingnews-s97m.onrender.com/news/comments/${idNews}/${idComment}/${idUser}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((response) => {
            console.log(response.data.message);
            alert(response.data.message);
            navigate('/home');

            
        }).catch((err) => {
            console.error('Error deleting comment:', err);
        });

    }

    return (
        <main> 
            <div className={styles.contentInfo} > 
                <div>
                    <Link to='/home'> <IoMdArrowRoundBack /> </Link>
                </div>
                <div className={styles.ajustContent}>
                    <h2> {news?.username} </h2>
                    <img className={styles.imgPublic}  src={news?.avatar} alt="logo" />
                </div>
            </div>

        <section className={styles.contentSection}> 
                <h2> {news?.title} </h2>
                <div className={styles.contentImgAndText}>
                    <p> {news?.text} </p>
                    <img className={styles.img} src={news?.banner} alt={news?.username} />
                </div>

                <div className={styles.contentLikesAndComments}>
                    <h2 className={styles.btnLiked}  onClick={() => LikedOnPost()}> <FaRegThumbsUp/> {news?.likes.length} </h2>
                    <h2> <LiaComments/> {news?.comments.length} </h2>
                </div>
            </section>

           
            <div className={styles.sessionComments}>
            <h4> Comentários </h4>
            <hr />
                {comments?.map((comment) => {
                    return (
                        <div key={comment._id} className={styles.sessionDeleteComment} >
                            
                            <div>
                                <h6>{comment.text}</h6>
                                <span> {new Date(comment.created).toLocaleString()} </span>
                            </div>

                            <span onClick={() => DeleteComment(id, comment._id)} className={styles.commentDelete}> excluir </span>
                        </div>
                    )
                })}
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contentComment}>
                <textarea
                    id="text"
                    cols={40}
                    rows={10}
                    {...register('text')}
                />
                {errors.text && <p className={styles.error}> {errors.text.message} </p>}
                    <button type="submit">Comentar</button>
                </form>


        </main>
    )
}