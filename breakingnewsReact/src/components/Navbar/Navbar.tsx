import { IoSearchOutline } from "react-icons/io5";
import logo from '../../assets/LogoBN.png';
import { Button, ImageLogo, InputSpace, Nav } from "./Navbar";

export default function Navbar() {
    return (
        <>
            <Nav>
                <InputSpace className="input-search-space">
                    <input type="text" placeholder="Digite um texto" />
                    <IoSearchOutline />
                </InputSpace>
                <ImageLogo src={logo} alt="logo"/>
                <Button> Entrar </Button>
            </Nav>
        </>
    );
}
