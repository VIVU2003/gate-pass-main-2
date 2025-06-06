import axios from "axios";
import { useEffect, useState } from "react";

function Admindash() {
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "",
      email: "",
    },
  ]);

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/getAll", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      setUsers(res.data.users);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function allowUser(id: number) {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/allow?id=${id}`,
        {},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 border-b last:border-b-0"
          >
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => allowUser(user.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Allow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admindash;
