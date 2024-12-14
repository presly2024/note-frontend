import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import AuthNavbar from "../components/authNavbar/AuthNavbar";
import { UserType } from "../utils/models";

const MainLayout = ({
     userInfo,
     onLogout,
}: {
     userInfo: UserType | null;
     onLogout: () => void;
}) => {
     return (
          <>
               {userInfo ? <Navbar user={userInfo} onLogout={onLogout} /> : <AuthNavbar />}
               <Outlet />
          </>
     );
};

export default MainLayout;
