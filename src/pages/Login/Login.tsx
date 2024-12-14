import React, { SyntheticEvent, useState } from "react";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
     const navigate = useNavigate();
     const [user, setUser] = useState({
          email: "",
          password: "",
     });

     const [error, setError] = useState<string | null>(null);

     const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { value, name } = event.target;
          setUser((prev) => {
               return {
                    ...prev,
                    [name]: value,
               };
          });
     };

     const handleSubmit = async (event: SyntheticEvent) => {
          event.preventDefault();

          const { email, password } = user;

          if (!email) return setError("email required");

          if (!password) return setError("password required");

          try {
               const response: any = await axiosInstance.post("/user/login", {
                    email,
                    password,
               });

               if (response?.data && response?.data.token) {
                    localStorage.setItem("token", response?.data.token);
                    navigate("/");
               }
          } catch (error: any) {
               if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
               ) {
                    setError(error.response.data.msg);
               } else {
                    setError("An unexpected error occured");
               }
          }
     };

     return (
          <div className="flex justify-center items-center">
               <div className="w-96 border rounded-mg mt-48 p-8 shadow-sm">
                    <form onSubmit={handleSubmit}>
                         <h4 className="text-2xl text-center font-bold mb-4">
                              Login
                         </h4>
                         <input
                              type="text"
                              value={user.email}
                              placeholder="Email"
                              className="input"
                              name="email"
                              onChange={handleOnChange}
                         />
                         <PasswordInput
                              placeholder="Password"
                              value={user.password}
                              handleOnChange={handleOnChange}
                         />
                         {error && (
                              <p className="text-sm text-red-500 mb-4">
                                   {error}
                              </p>
                         )}
                         <button className="btn-primary mb-4">Login</button>
                    </form>
                    <p className="text-center">
                         not yet registered?{" "}
                         <Link
                              to={"/signup"}
                              className="text-primary underline"
                         >
                              create an account
                         </Link>
                    </p>
               </div>
          </div>
     );
};

export default Login;
