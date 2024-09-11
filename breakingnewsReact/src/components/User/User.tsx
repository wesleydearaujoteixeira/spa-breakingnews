import {useState, useEffect} from 'react';
import { GetProfile, GetUser } from "../../services/servicesPost";
import styles from '../User/userProfile.module.css';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa6";
import { TfiComments } from "react-icons/tfi";
import { MdOutlineControlPoint } from "react-icons/md";




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
    }, [])


    return(

        <main className={styles.contentUser}>
            <div className={styles.headerUser}>
                <Link to='/home'> <IoArrowBack /> </Link>
                <div></div>
            </div>

            <div className={styles.contentHeaderProfile}>
                <img className={styles.ProfileImg} src={userNews.avatar} alt={userNews.name} />
                <h3 className={styles.title}>{userNews.name}</h3>
            </div>

            <div className={styles.BtnPost}>
                <Link to='/post'> <MdOutlineControlPoint /> </Link>
            </div>

            <div className={styles.contentUserGrid}>
                {user.length > -1 && user.map((news) => (
                    <div key={news.id}>
                        <h2>{news.title}</h2>
                        <img src={news.banner} className={styles.imgContent} alt={news.title} />
                        <p>Criado em: {new Date(news.createdAt).toLocaleString()}</p>
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