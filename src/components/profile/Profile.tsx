import { Link } from "react-router-dom";

const Profile = ({
     name,
     onLogout,
}: {
     name: string;
     onLogout: () => void;
}) => {
     return (
          <div className="flex items-center gap-2">
               <div className="w-12 text-center leading-[48px] font-bold h-12 rounded-full bg-slate-100">
                    {getNameInitials(name)}
               </div>
               <div className="flex flex-col items-start text-sm">
                    <p>{name}</p>
                    <Link
                         to={"/login"}
                         onClick={onLogout}
                         className="underline"
                    >
                         Logout
                    </Link>
               </div>
          </div>
     );
};

const getNameInitials = (name: string): string => {
     const seperatedNames = name.split(" ");
     let initials: string = "";
     for (let i = 0; i < seperatedNames.length; i++) {
          initials += seperatedNames[i][0];
     }
     return initials;
};

export default Profile;
