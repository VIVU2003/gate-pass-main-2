import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Scan() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState<number | null>(null);

  async function allDone() {
    try {
      await axios.put(`http://localhost:3000/api/guard/done?id=${id}`);
      alert("All done");
    } catch (e) {
      alert("Error occurred");
    }
  }

  async function getDetail() {
    try {
      const res = await axios.get("http://localhost:3000/api/user/me", {
        headers: { Authorization: token },
      });
      setName(res.data.name);
      setRollNo(res.data.rollno);
    } catch (e) {
      alert("Error fetching details");
    }
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Student Authorized
        </h1>
        <p className="text-gray-600 mb-4">The student is permitted to leave.</p>

        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {name || "Loading..."}
          </h2>
          <p className="text-gray-500">{rollNo ?? "Fetching roll number..."}</p>
        </div>

        <button
          onClick={allDone}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
}