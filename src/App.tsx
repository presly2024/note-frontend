import Home from "./pages/Home/Home";

import {
     createBrowserRouter,
     createRoutesFromElements,
     Route,
     RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MainLayout from "./layouts/MainLayout";
import { useState } from "react";
import { UserType } from "./utils/models";

const App = () => {

     const [userInfo, setUserInfo] = useState<UserType | null>(null);



     const onLogout = () => {
          localStorage.clear();
          setUserInfo(null);
     };
     const router = createBrowserRouter(
          createRoutesFromElements(
               <Route
                    path="/"
                    element={
                         <MainLayout userInfo={userInfo} onLogout={onLogout} />
                    }
               >
                    <Route index element={<Home setUserInfo={setUserInfo} />} />
                    ,
                    <Route path="/login" element={<Login />} />,
                    <Route path="/signup" element={<Signup />} />,
               </Route>
          )
     );

     return (
          <>
               <RouterProvider router={router} />

               {/* <Router>
                    <Routes>
                         <Route index element={<Home />} />,
                         <Route path="/login" element={<Login />} />
                         ,
                         <Route path="/signup" element={<Signup />} />,
                    </Routes>
               </Router> */}
          </>
     );
};

export default App;
