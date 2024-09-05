import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import style from '../../contextAPI/context.module.css';


export function SearchNews () {

    type PropsSearch = {
        id: string,
        title: string;
        banner: string;
        text: string;
    }
    

    const [search, setSearch] = useState <PropsSearch[]>([]);


    const [searchParams] = useSearchParams();
    const title = searchParams.get('query') || '';


 async function SearchNow () {

        const baseUrl = 'https://api-breakingnews-s97m.onrender.com'

        try {
            // URL encode the title to handle special characters
            const response = await axios.get(`${baseUrl}/news/search?title=${title}`);
            setSearch(response.data.news);
            return response.data;
        } catch (error) {
            console.error('Error during search:', error);
            throw new Error('Failed to fetch search results.'); // Customize the error message as needed
        }
    }


    useEffect(() => {
        SearchNow()
           .then((response) => {
                console.log(response.news);
            })
           .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }, [])


    return (
        <div className={style.app}>

            <div>
                <Link to='/home' > <button className={style.buttonBack} > Voltar </button> </Link> 
                <h3> Encontramos {search.length} resultados </h3>
            </div>
            
            <div className={style.appContent}>
                {search.length > 0 && search.map((search) => {
                    return (
                        <div key={search.id}>
                            <h2>{search.title}</h2>
                            <img src={search.banner} className={style.imgApp} alt="" />
                            <h4>{search.text}</h4>
                        </div>
                    )
                })}
            </div>

            {search.length <= 0 && <> <h1> Encontramos nenhum resultado </h1></>}

              
        </div>
    )
}