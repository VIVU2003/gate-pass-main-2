import { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import frontImage from "../Images/frontImage.jpg";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSignin() {
    try {
      const res = await axios.post("http://localhost:3000/api/user/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dash");
    } catch (e) {
      console.log(e);
      alert("Invalid input");
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white shadow-md">
        <Heading
          heading="Enter details to Sign In"
          subheading="Don't have an account?"
          log="Signup"
          link="/signup"
        />
        <div className="w-full max-w-md space-y-4">
          <Inputbox label="Email" type="email" placeholder="Enter Your Email" setValue={setEmail} />
          <Inputbox label="Password" type="password" placeholder="Enter Your Password" setValue={setPassword} />
          <Button label="Signin" onClick={handleSignin} />
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img src={frontImage} className="w-full h-full object-cover" alt="Signin" />
      </div>
    </div>
  );
}

export default Signin;