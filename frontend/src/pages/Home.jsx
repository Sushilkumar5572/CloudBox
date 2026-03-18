import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const handleLogout = () => {

    logoutUser();
    navigate("/");

  };

  return (

    <div>

      <h1>CloudBox Dashboard | Warm Welcomme</h1>

      <button onClick={handleLogout}>Logout</button>

    </div>

  );

}
