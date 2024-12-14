import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const PasswordInput = ({
     placeholder,
     value,
     handleOnChange,
}: {
     placeholder: string;
     value: string;
     handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
     const [showPassword, setShowPassword] = useState(true);
     return (
          <div className="flex items-center border-[1.5px] rounded mb-4 pr-5">
               <input
                    type={showPassword ? "text" : "password"}
                    className="pl-5 flex-[1] py-2 outline-none bg-transparent"
                    value={value}
                    placeholder={placeholder ?? ""}
                    name="password"
                    onChange={handleOnChange}
               />
               {showPassword ? (
                    <FaRegEye
                         className="text-primary cursor-pointer"
                         size={20}
                         onClick={() => setShowPassword(false)}
                    />
               ) : (
                    <FaRegEyeSlash
                         className="text-primary cursor-pointer"
                         size={20}
                         onClick={() => setShowPassword(true)}
                    />
               )}
          </div>
     );
};

export default PasswordInput;
