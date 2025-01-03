import { Link, NavLink } from "react-router-dom";
import Div from "../common/Div";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/getApi";
import Profile from "../common/Profile";
import { Spin } from "antd"; // Ant Design spinner for loading effect
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/feathers/auth";

const NavBar = () => {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Books", path: "/books" },
    { name: "Contact", path: "/contact" },
  ];

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        console.log(response);
        
        setProfile(response.user);
        dispatch(setUser(response.user))
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Div className="">
      <nav className="   px-6 py-4 w-full">
        <ul className="flex gap-6 items-center justify-end">
          {navItems.map((item) => (
            <li key={item.name} className="relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? " text-black font-serif text-ternary  "
                      : " text-sm "
                  }`
                }
                aria-label={item.name}
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Profile Section */}
          <li className="relative">
            {loading ? (
              <Spin size="small" /> // Display loading spinner
            ) : profile ? (
              <Profile profile={profile} />
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary rounded-md text-white font-semibold hover:bg-primary-dark transition-all"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Div>
  );
};

export default NavBar;
