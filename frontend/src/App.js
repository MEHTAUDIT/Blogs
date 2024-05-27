// import { Toast } from "@chakra-ui/react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

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
          </Routes>
      </Router>
    </div>
  );
}

export default App;