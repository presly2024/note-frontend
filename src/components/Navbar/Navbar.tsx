import { MdSearch } from "react-icons/md";
import Profile from "../profile/Profile";
import { UserType } from "../../utils/models";

const Navbar = ({ user, onLogout }: { user: UserType; onLogout: () => void }) => {
     return (
          <header className="sticky top-0 left-0 p-5 shadow-md w-full bg-white flex items-center justify-between">
               <h1 className="text-lg">Notes</h1>
               <div className="items-center gap-2 bg-slate-200 w-96 px-5 rounded-lg hidden sm:flex">
                    <input
                         className="flex-1 bg-transparent p-2 outline-none text-sm"
                         type="text"
                         placeholder="search notes"
                    />
                    <MdSearch size={20} className="text-slate-400" />
               </div>
               {user && <Profile name={user.name} onLogout={onLogout} />}
          </header>
     );
};

export default Navbar;
