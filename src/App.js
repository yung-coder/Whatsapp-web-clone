import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useState } from "react";
function App() {
  const [{user}, dispatch] = useStateValue();
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
      
    }
  };
  
  return (
    <div className="app">
      {!user ? (
        <Home />
      ) : (
        <div className="app-body">
          <Router>
            <Sidebar toggleMode={toggleMode} mode={mode} />
            <Routes>
              <Route path="/" element={<Chat toggleMode={toggleMode} mode={mode} />} />
              <Route exact path="/rooms/:roomId" element={<Chat  toggleMode={toggleMode} mode={mode} />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
