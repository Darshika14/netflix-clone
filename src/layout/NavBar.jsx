import { Link } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="p-2 bg-gray-600 shadow-sm flex justify-between">
      <div className="flex flex-row gap-4">
        <Link to="/browse" className="hover:bg-gray-500 p-1 hover:rounded-lg">
          Home
        </Link>
        <Link to="/about" className="hover:bg-gray-500 p-1 hover:rounded-lg">
          About
        </Link>
      </div>
      <button
        className="bg-grey-100 px-2 py-1 text-sm rounded font-medium hover:bg-gray-400 transition"
        onClick={() => {
          console.log("test");
          logout();
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
