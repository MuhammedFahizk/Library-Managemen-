import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHistory, FaUserAlt } from "react-icons/fa"; // Import React Icons
import Div from "../components/common/Div";
import { BiBookAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Text from "../components/common/Text";
import { Avatar, Dropdown, Menu, notification } from "antd";
import { logout, logoutEveryDevice } from "../services/postApi";
import { authUserLogout } from "../Redux/feathers/auth";

const Profile = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const { user } = useSelector((state) => state.auth); 

  // Notification handler
  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 2,
    });
  };

  // Logout handler
  const handleLogout = async (option) => {
    try {
      if (option === "this device") {
        await logout(); 
      } else if (option === "all devices") {
        await logoutEveryDevice(); 
      }

      dispatch(authUserLogout());
      openNotification("success", `Logged out from ${option}`);
      navigate("/home");
    } catch (error) {
      openNotification("error", "Logout failed. Please try again.");
      console.error("Error logging out:", error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleLogout("this device")}>Logout from this device</Menu.Item>
      <Menu.Item onClick={() => handleLogout("all devices")}>Logout from all devices</Menu.Item>
    </Menu>
  );

  const items = [
    { name: "History", link: "history", icon: <FaHistory size={18} />, roles: ["user", "admin"] },
    { name: "Add Book", link: "addBook", icon: <BiBookAdd size={18} />, roles: ["user","admin"] },
  ];
  const userRole = user?.role || "user";

  const avatarSrc = user?.imageUrl || null;

  return (
    <Div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Sidebar */}
      <Div className="bg-[#00000010] h-[85vh] rounded-2xl p-5">
        <div className="mb-5 text-center">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
        </div>
        <Div className="flex justify-center flex-col items-center px-2 py-4">
          <Avatar
            src={avatarSrc}
            icon={avatarSrc ? null : <FaUserAlt />}
            size={90}
            className="text-white"
          />
          <Text className="text-md text-ternary">{user?.username}</Text>
          <Text className="text-sm">{user?.email}</Text>
        </Div>

        {items
          .filter((item) => item.roles.includes(userRole)) // Filter items by role
          .map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-primary mb-3 transition-all"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Logout Button */}
        <Dropdown overlay={menu} trigger={["hover"]}>
          <button
            className="flex items-center gap-2 py-2 px-4 rounded-md text-red-600 hover:bg-red-100 w-full mt-5 transition-all"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </Dropdown>
      </Div>

      {/* Main Content Area */}
      <Div className="bg-[#00000010] col-span-3 rounded-2xl p-5">
        <Outlet />
      </Div>
    </Div>
  );
};

export default Profile;
