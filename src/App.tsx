import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Appbar from "./components/appbar/Appbar";
import Registerform from "./pages/login-register/Register";
import Loginform from "./pages/login-register/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer/Footer";
import MenuPage from "./pages/MenuPage";
import {UserProvider, UserContext} from "./components/userContext/UserContextProvider";
import React from "react";
import Orderpage from "./pages/orderpage/Orderpage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
    return (
            <Router>
                    <UserProvider>
                    <div className="App">
                        <Appbar />
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/login" element={<Loginform />} />
                            <Route path="/register" element={<Registerform />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/order" element={<Orderpage />} />
                        </Routes>
                        <ToastContainer
                            style={{marginTop: "40px"}}
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                    </UserProvider>
                <Footer />
            </Router>
    );
}

export default App;
