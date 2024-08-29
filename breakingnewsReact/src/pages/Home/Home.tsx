import Card from "../../components/Cards/Card.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx"
import './card.css';
export default function Home() {
    return (
        <>
            <Navbar />
            <h1> Breaking News </h1>
            <div className="card">
                <Card/>
            </div>
        </>
    );
}
