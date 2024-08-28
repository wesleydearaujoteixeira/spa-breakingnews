import Card from "../../components/Cards/Card.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx"
import './card.css';
export default function Home() {
    return (
        <>
            <Navbar />
            <div className="card">
                <Card/>
            </div>
        </>
    );
}
