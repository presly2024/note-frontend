import { MdClose } from "react-icons/md";

const Tag = ({
     tag,
     handleRemoveTag,
}: {
     tag: string;
     handleRemoveTag: () => void;
}) => {
     return (
          <div className="p-1 text-sm bg-slate-200 rounded-sm flex items-center gap-2">
               <p>#{tag}</p>
               <MdClose
                    size={20}
                    className="cursor-pointer"
                    onClick={handleRemoveTag}
               />
          </div>
     );
};

export default Tag;
