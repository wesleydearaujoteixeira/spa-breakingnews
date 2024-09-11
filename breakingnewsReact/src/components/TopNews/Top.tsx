import { useEffect, useState } from "react"
import { TopNews } from "../../services/servicesPost"
import styles from './topStyles.module.css';
import { FaThumbsUp } from "react-icons/fa6";
import { TfiComments } from "react-icons/tfi";

type Likes = {
    userId: string,
    created: string,
    _id: string
}

type comment = {
    username: string,
    avatar: string

}

type User = {
    id: string,
    title: string,
    text:  string,
    banner: string,
    likes: Likes[],
    comments: comment[]

}


export function Top () {

    const defaultUser: User = {
        id: '',
        title: '',
        text: '',
        banner: '',
        likes: [],
        comments: []
      };
    const [user, setUser] = useState<User>(defaultUser);

    useEffect(() => {
        TopNews().then((response) => {
            setUser(response.news);
        }).catch(error => console.log(error));
    }, []); 

    return (
        <main className={styles.container}>
            <section className={styles.main}>
                {user && (
                    <div key={user.id}>
                        <h1 className={styles.title}>  {user.title} </h1>
                        <p className={styles.p} >{user.text}</p>
                        <img className={styles.imgTop} src={user.banner} alt={user.title} />
                        <div className={styles.LikesComments}>
                            <h3> <FaThumbsUp />: {user.likes.length} </h3>
                            <h3> <TfiComments />: {user.comments.length} </h3>
                        </div>
                        <hr />
                    </div>
                )}
            </section>
        </main>
    )

}