import Card from "../../components/Cards/Card.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx"
import { Top } from "../../components/TopNews/Top.tsx";
import './card.css';
export default function Home() {
    return (
        <>
            <Navbar />
            <h1> Breaking News </h1>
            <Top/>
            <div className="card">
                <Card/>
            </div>
            <Footer/>
        </>
    );
}
