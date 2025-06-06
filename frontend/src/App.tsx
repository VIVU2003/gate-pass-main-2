import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import LeaveApplication from "./pages/Dashboard.";
import Auth from "./pages/Auth";
import AdminSignup from "./pages/AdminSignup";
import AdminSignin from "./pages/AdminSignin";
import Admindash from "./pages/AdminDash";
import Waiting from "./pages/Waiting";
import Qr from "./pages/Qr";
import Scan from "./pages/Scan";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Signup></Signup>} path="/signup"></Route>
          <Route element={<Signin></Signin>} path="/signin"></Route>
          <Route element={<LeaveApplication />} path="/dash"></Route>
          <Route element={<Auth />} path="/auth"></Route>
          <Route element={<AdminSignup />} path="/adminsignup"></Route>
          <Route element={<AdminSignin />} path="/adminsignin"></Route>
          <Route element={<Admindash />} path="/admindash"></Route>
          <Route element={<Waiting/>} path="/waiting"></Route>
          <Route element={<Qr/>} path="/qr"></Route>
          <Route element={<Scan/>} path="/scan"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
