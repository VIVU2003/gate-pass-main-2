import { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import frontImage from "../Images/frontImage.jpg";
import {useNavigate} from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentEmail, setParentsEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const [rollno, setRollno] = useState("");
  const navigate = useNavigate();
  async function handleSignUp() {
    try {
      const res = await axios.post("http://localhost:3000/api/user/signup", {
        name,
        email,
        password,
        parentEmail,
        rollno,
        hostelName: hostel,
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
          heading="Enter details to Sign Up"
          subheading="Already have an account?"
          log="Signin"
          link="/signin"
        />
        <div className="w-full max-w-md space-y-4">
          <Inputbox
            label="Name"
            type="text"
            placeholder="Enter Your Name"
            setValue={setName}
          />
          <Inputbox
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            setValue={setEmail}
          />
          <Inputbox
            label="Password (min 6 characters)"
            type="password"
            placeholder="Enter Your Password"
            setValue={setPassword}
          />
          <Inputbox
            label="Parents Email"
            type="email"
            placeholder="Enter Parents Email"
            setValue={setParentsEmail}
          />
          <Inputbox
            label="Hostel Name"
            type="text"
            placeholder="Enter Hostel Name"
            setValue={setHostel}
          />
          <Inputbox
            label="Roll No"
            type="text"
            placeholder="Enter Your Roll No"
            setValue={setRollno}
          />
          <Button label="Signup" onClick={handleSignUp} />
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={frontImage}
          className="w-full h-full object-cover"
          alt="Signup"
        />
      </div>
    </div>
  );
}

export default Signup;
