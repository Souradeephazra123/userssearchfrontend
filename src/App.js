import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import TeamList from "./pages/TeamList/TeamList";
import TeamDetails from "./pages/TeamDetails/TeamDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
      </Routes>
    </div>
  );
}

export default App;
