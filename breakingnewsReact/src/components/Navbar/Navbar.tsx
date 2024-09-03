import { IoSearchOutline } from "react-icons/io5";
import logo from '../../assets/LogoBN.png';
import { Button, ImageLogo, InputSpace, Nav } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchNow } from "../../services/servicesPost";


export default function Navbar() {
    const navigate = useNavigate();
    const [text, setText] = useState('');

    useEffect(() => {
        // Fetch search results whenever `text` changes
            SearchNow(text)
                .then((response) => {
                    console.log(response.news[0]);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                });
        
    }, []);

    const handleSearch = () => {
        // Navigate to search page with query
        navigate(`/search?query=${encodeURIComponent(text)}`);
    };

    return (
        <>
            <Nav>
                <InputSpace className="input-search-space">
                    <input
                        type="text"
                        placeholder="Digite um texto"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <IoSearchOutline onClick={handleSearch} />
                </InputSpace>
                <ImageLogo src={logo} alt="logo" />
                <Button>Entrar</Button>
            </Nav>
            <Outlet />
        </>
    );
}
