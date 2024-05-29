// import { Toast } from "@chakra-ui/react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {

  const routes = [
    {
      path:"/",
      element:<App />
    }
  ]

  return (
    <div>
      <Router>
          {/* <Toast /> */}
          <div>
            <Header />
          </div>

          <Routes>
            <Route path="/register" element={<Register />}  />
            <Route path="/login" element={<Login />}  />
            <Route path="/" element={<Home />}  />
          </Routes>
      </Router>
    </div>
  );
}

export default App;