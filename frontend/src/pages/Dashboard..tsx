import { useState } from "react";
import Heading from "../components/Heading";
import Inputbox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import frontImage from "../Images/frontImage.jpg";
import { useNavigate } from "react-router-dom";
function LeaveApplication() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [placeToGo, setPlaceToGo] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  async function handleLeaveApplication() {
    try {
      await axios.post(
        "http://localhost:3000/api/user/send",
        {
          from: fromDate,
          to: toDate,
          place: placeToGo,
          reason,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/waiting");
      alert("Leave Application Submitted Successfully");
    } catch (e) {
      console.log(e);
      alert("Invalid input");
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white shadow-md">
        <Heading
          heading="Leave Application Form"
          subheading="Fill in the details to request leave"
          link=""
          log=""
        />
        <div className="w-full max-w-md space-y-4">
          <Inputbox
            label="From Date"
            type="date"
            placeholder="Select From Date"
            setValue={setFromDate}
          />
          <Inputbox
            label="To Date"
            type="date"
            placeholder="Select To Date"
            setValue={setToDate}
          />
          <Inputbox
            label="Place to Go"
            type="text"
            placeholder="Enter Destination"
            setValue={setPlaceToGo}
          />
          <Inputbox
            label="Reason"
            type="text"
            placeholder="Enter Reason"
            setValue={setReason}
          />
          <Button label="Submit" onClick={handleLeaveApplication} />
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={frontImage}
          className="w-full h-full object-cover"
          alt="Leave Application"
        />
      </div>
    </div>
  );
}

export default LeaveApplication;
