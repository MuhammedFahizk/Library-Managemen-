import { Outlet } from "react-router-dom"
import Div from "../common/Div"
import NavBar from "../layout/NavBar"

const CommonRoutes = () => {
  return (
    <Div className={" bg-[#2eb0854f]  h-screen  p-2"}>
    <NavBar></NavBar>
    <Outlet />
  </Div>
  )
}

export default CommonRoutes