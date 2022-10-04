import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as Divider } from "../assets/divider.svg";
import Checkbox from "./checkbox";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Card() {
    const history = useNavigate();

    return (
        <div
            className="card w-8/12 bg-base-100 shadow-xl"
            onClick={() => {
                history("/friendGoal");
            }}
        >
            <figure>
                <div className="flex flex-col items-center">
                    <h1 className="card-title">The Goal </h1> <Divider />
                    Run the Brisbane Bridge 5km
                </div>
            </figure>
            <div className="card-body ">
                <h3>Today's Tasks:</h3>
                <div className="grid grid-cols-12">
                    <div className="col-span-11">
                        <Checkbox label={"Run 3km"} />
                        <Checkbox label={"Post a photo"} />{" "}
                    </div>
                    <FontAwesomeIcon className="col-span-1 pl-5 text-xl" icon={faAngleRight} />
                </div>
            </div>
        </div>
    );
}

export default Card;
