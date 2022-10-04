import "./App.css";
import Homepage from "./pages/homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import FriendGoals from "./pages/FriendGoals";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/friendGoal" element={<FriendGoals />} />
                {/* <div className="bg-background-yellow h-screen">
                    <div className="card-title justify-center pt-10">Hi User!</div>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/friendGoal" element={<FriendGoals />} />

                    <div className="flex flex-row absolute right-2 bottom-2 gap-4 hover:text-black">
                        <button className="p-5 hover:bg-blue rounded-full bg-yellow text-background-yellow">
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                        <button className="p-5 bg-blue rounded-full hover:bg-yellow text-background-yellow">
                            <FontAwesomeIcon icon={faUserGroup} />
                        </button>
                    </div>
                </div> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
