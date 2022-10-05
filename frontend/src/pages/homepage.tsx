import { ReactComponent as Divider } from "../assets/divider.svg";
import Card from "../components/Card";
import ContentCard from "../components/ContentCard";

function Homepage() {
    return (
        <div className="flex flex-col justify-center h-screen place-items-center bg-background-yellow">
            <Card />
            <ContentCard />
        </div>
    );
}

export default Homepage;
