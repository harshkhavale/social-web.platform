import { BrowserRouter , Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";

function App() {

  // const isAuth =  Boolean(useSelector((state)=>state.token));
const user = useSelector((state)=>state.user);
  return (
    <div className="App">
      <div><Toaster/></div>
      <Header/>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={user?<HomePage/>:<LandingPage/>}/>
   
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
