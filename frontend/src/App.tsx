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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
