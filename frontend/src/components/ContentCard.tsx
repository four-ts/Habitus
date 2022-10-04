import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ContentCard() {
    return (
        <div>
            <h1 className="card-title">Your Feed</h1>
            <div className="card w-8/12 bg-base-100 shadow-xl">
                <div id="title-header" className="grid grid-cols-3 items-center text-center">
                    <FontAwesomeIcon className="col-span-1 p-12" icon={faUser} />
                    <div className="col-span-1">
                        <h2>John Smith</h2>
                        <p>Goal Partner: Billie Parker</p>
                    </div>
                    <div className="col-span-1">
                        <FontAwesomeIcon icon={faHeart} />
                        <h2>30</h2>
                    </div>
                </div>
                <div className="grid grid-rows-2 items-center text-center">insert image caption</div>
            </div>
        </div>
    );
}

export default ContentCard;
