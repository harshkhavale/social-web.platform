import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import AuthModel from "./mod/AuthModel";
import { useState } from "react";

function App() {
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <div className="App text-sm md:text-base">
      <div>
        <Toaster />
      </div>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <LandingPage />} />
          <Route
            path="/reset-password/:token"
            element={<AuthModel handler={handleModal} init={"RP"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
