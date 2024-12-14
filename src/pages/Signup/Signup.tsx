import React, { SyntheticEvent, useState } from "react";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";

const Signup = () => {
     const navigate = useNavigate();
     const [user, setUser] = useState({
          name: "",
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

          const { email, password, name } = user;
          if (!name) return setError("*name is required");

          if (!email) return setError("*email is required");

          if (!password) return setError("*password is required");

          try {
               const response = await axiosInstance.post(
                    "/user/register",
                    {
                         name,
                         email,
                         password,
                    }
               );

               if (response?.data && response?.data.token) {
                    localStorage.setItem("token", response?.data.token);
                    navigate("/");
               }
          } catch (error) {
               console.log(error)
               if (error instanceof AxiosError) {

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
          }
     };

     return (
          <div className="flex justify-center items-center">
               <div className="w-96 border rounded-mg mt-48 p-8 shadow-sm">
                    <form onSubmit={handleSubmit}>
                         <h4 className="text-2xl text-center font-bold mb-4">
                              Signup
                         </h4>
                         <input
                              type="text"
                              value={user.name}
                              placeholder="Full Name"
                              className="input"
                              name="name"
                              onChange={handleOnChange}
                         />
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
                         <button className="btn-primary mb-4">Signup</button>
                    </form>
                    <p className="text-center">
                         Already have an account?{" "}
                         <Link to={"/login"} className="text-primary underline">
                              login
                         </Link>
                    </p>
               </div>
          </div>
     );
};

export default Signup;
