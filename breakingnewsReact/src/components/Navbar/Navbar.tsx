import { IoSearchOutline } from "react-icons/io5";
import logo from '../../assets/LogoBN.png';
import { Button, ImageLogo, InputSpace, Nav } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Profile } from "../profile/Profile";



export default function Navbar() {


    const token =  localStorage.getItem('token') || '';

    if(!token) {
        console.log('Token not found');
    }else {
        console.log("token:", token);
    }


    const navigate = useNavigate();
    const [text, setText] = useState('');

    const handleSearch = () => {
        // Navigate to search page with query

        setTimeout(() => {
            navigate(`/search?query=${text}`);
        }, 1500);


    };


    const AuthLogin = () => {
        // Navigate to login page
        navigate('/login');
    }

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

                    <Button>
                    <IoSearchOutline onClick={handleSearch} style={{
                        transition: 'color 0.3s ease-in-out',
                        color: text.length > 0? '#000' : '#ccc',
                        cursor: 'pointer'
                    }}/>
                    </Button>

                   

                </InputSpace>
                <ImageLogo src={logo} alt="logo"/>

                {token && <Profile/> }
                {!token &&  ( <Button onClick={() => AuthLogin()}> Entrar </Button> )}
            </Nav>
            <Outlet />
        </>
    );
}

