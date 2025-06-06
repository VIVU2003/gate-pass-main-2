import axios from "axios";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Waiting() {
  const [parent, setParent] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [id,setId] = useState<string>("");
  const navigate = useNavigate();
  async function checkUpdates() {
    try {
      const res = await axios.get("http://localhost:3000/api/user/me", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const user = res.data;
      setId(user.id);
      setParent(user.parentAuth || false);
      setAdmin(user.adminAuth || false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUpdates();
    const interval = setInterval(checkUpdates, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{
    if(parent && admin){
      navigate(`/qr?id=${id}`);
    }
  })
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-center mb-6 text-gray-800">Authentication Progress</h1>

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-1 bg-gray-300 rounded-full"></div>
          <Step label="Mail Sent" status={loading ? "loading" : "done"} />
          <Step label="Parent Authentication" status={parent ? "done" : "pending"} />
          <Step label="Admin Authentication" status={admin ? "done" : "pending"} />
        </div>
      </div>
    </div>
  );
}

interface StepProps {
  label: string;
  status: "pending" | "done" | "loading";
}

function Step({ label, status }: StepProps) {
  return (
    <div className="relative flex items-center space-x-4 py-4 group">
      {/* Icon */}
      <div className="relative z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-gray-300 group-hover:border-blue-500 transition-all duration-300">
        {status === "done" && <CheckCircle className="text-green-500 w-6 h-6" />}
        {status === "loading" && <Loader2 className="text-blue-500 w-6 h-6 animate-spin" />}
        {status === "pending" && <XCircle className="text-gray-400 w-6 h-6" />}
      </div>

      {/* Label */}
      <span
        className={`text-lg font-semibold transition-all duration-300 ${
          status === "done" ? "text-green-600" : status === "loading" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}