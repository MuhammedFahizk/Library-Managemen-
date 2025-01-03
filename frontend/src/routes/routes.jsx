import {
 
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import PublicRoutes from "../components/Utils/PublicRoutes";
import ProtectedRoutes from "../components/Utils/ProtectedRoutes";
import Books from "../pages/Books";
import CommonRoutes from "../components/Utils/CommonRoutes";
import Profile from "../pages/Profile";
import Bookings from "../pages/Bookings";
import History from "../pages/History";
import AddBooks from "../pages/AddBooks";
import MyBooks from "../pages/MyBooks";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    // element: <PublicRoutes />,
    element: <CommonRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "profile",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "",
            element: <Profile />,
            children: [
              {
                path: "bookings",
                element: <Bookings />,
              },
              {
                path: "history",
                element: <History />,
              },
              {
                path: "addBook",
                element: <AddBooks />,
              },
              {
                path: "books",
                element: <MyBooks/>,
              },
            ],
          },
        ],
      },
    ],
  },
 
]);
