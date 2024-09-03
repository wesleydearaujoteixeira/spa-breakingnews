import { SearchObj } from "./SearchObj";


type SearchProps = {
    title: string,
    banner: string,
    text: string,

}

export function SearchNews ({title, banner, text} : SearchProps) {

    const searchData = SearchObj({ title, banner, text });



    return (
        <div>
            <h1> {searchData.title} </h1>
            <p> {searchData.text} </p>   
            <img src={searchData.banner} alt="img" />
        </div>
    )
}