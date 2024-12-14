import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = ({
     userInfo,
     onLogout,
}: {
     userInfo: any;
     onLogout: () => void;
}) => {
     return (
          <>
               {<Navbar user={userInfo} onLogout={onLogout} />}
               <Outlet />
          </>
     );
};

export default MainLayout;
