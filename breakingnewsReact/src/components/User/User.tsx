import {useState, useEffect} from 'react';
import { DeletePost, GetProfile, GetUser } from "../../services/servicesPost";
import styles from '../User/userProfile.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa6";
import { TfiComments } from "react-icons/tfi";
import { MdOutlineControlPoint } from "react-icons/md";
import { FaArrowUpFromBracket } from "react-icons/fa6";




export function User() {

    interface Like {
        userId: string;
        created: string;
        _id: string;
      }

      interface Comment {
        userId: string; // This should be a reference to a User ID
        text: string;
        created: string; // ISO 8601 date string
      }
      
      // Define a type for the news item
      interface NewsItem {
        id: string;
        title: string;
        text: string;
        banner: string;
        createdAt: string;
        likes: Like[];
        comments: Comment[]; // Assuming comments will be structured similarly to likes, or adjust as needed
        username: string;
        avatar: string;
      }


    interface UserProfile {
        _id: string;
        name: string;
        username: string;
        email: string;
        avatar: string;
      }
      

      const [userNews, setUserNews] = useState <UserProfile> ({
        _id: '',
        name: '',
        username: '',
        email: '',
        avatar: '',
      });


      const navigate = useNavigate();

      const id = localStorage.getItem('id') || '';
      const [user, setUser] = useState <NewsItem[]> ([]);


    useEffect (() => {
        GetUser().then((response) => {
            console.log(response);
            setUser(response.news);
        }).catch((error) => {
            console.error('Error fetching profile:', error);
        })


    }, []);

    useEffect(() => {
        GetProfile(id).then((response) => {
            console.log(response);
            setUserNews(response.user);
        }).catch((error) => {
            console.error('Error fetching profile:', error);
        })
    }, []);


    const Delete = (id: string) => {

      const confirmation = confirm('Tem certeza que deseja deletar esse post?');

      if(!confirmation) return;

      DeletePost(id).then((response) => {
        console.log(response);
        alert('Post deleted successfully')
        window.location.reload();
        }).catch((error) => { 
            alert('Post n pode ser deletado');
            console.error('Error deleting post:', error);
        });
    }

    const editPost = (id: string) => {
        alert('Edit Post');
        navigate(`/edit/${id}`);
    

    }

      
  

    return (

        <main className={styles.contentUser}>
            <div className={styles.headerUser}>
                <Link to='/home'> <IoArrowBack /> </Link>
                <div></div>
            </div>

            <div className={styles.contentHeaderProfile}>
                <div>
                    <img className={styles.ProfileImg} src={userNews.avatar} alt={userNews.name} />
                    <h3 className={styles.title}>{userNews.name}</h3>
                </div>
                
                <div>
                    <Link className={styles.LinkEdit}  to={`/EditUser/${userNews._id}`} > 
                        <FaArrowUpFromBracket />
                        <p> Editar perfil </p> 
                     </Link>
                </div>

            </div>

            <div className={styles.BtnPost}>
                <Link  to='/post'> <MdOutlineControlPoint /> </Link>
            </div>

            <div className={styles.contentUserGrid}>
                {user.length > -1 && user.map((news) => (
                    <div key={news.id}>
                        <h2>{news.title}</h2>
                        <img src={news.banner} className={styles.imgContent} alt={news.title} />
                        <p>Criado em: {new Date(news.createdAt).toLocaleString()}</p>
                        <div>  
                            <span
                            className={styles.edit}
                            onClick={() => editPost(news.id)} 
                            > editar </span>
                            <span   
                            className={styles.delete}
                            onClick={() => Delete(news.id)}> excluir </span>    
                        </div>
                        <span className={styles.feedCommentsLikes}>
                            <p> <FaThumbsUp />: {news.likes.length}</p>
                            <p> <TfiComments />: {news.comments.length}</p>
                        </span>
                        <hr />
                    </div>
                ))}
            </div>
            {user.length == 0 &&  <h1> Não há postagens </h1>}
        </main>
         
       
    )
}