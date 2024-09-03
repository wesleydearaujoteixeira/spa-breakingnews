import { useEffect, useState } from "react"
import { TopNews } from "../../services/servicesPost"
import { ContainerTop, LikesComments } from "./TopStyle"


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
        <ContainerTop>

            {user && (
                <div key={user.id}>
                    <h1>{user.title}</h1>
                    <p>{user.text}</p>
                    <img src={user.banner} alt={user.title} />
                    <LikesComments>
                        <h3>Likes: {user.likes.length}</h3>
                        <h3>Comentarios: {user.comments.length}</h3>
                    </LikesComments>
                    <hr />
                </div>
            )}
        </ContainerTop>
    )

}