import axios from "axios";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  async function handleAuth() {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/user/auth?token=${token}`
      );
      alert("Authenticated");
    } catch (e) {
      alert("Cannot authenticate");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Press the button given below to authenticate
        </h1>
        <Button onClick={handleAuth} label="Authenticate" />
      </div>
    </div>
  );
}
