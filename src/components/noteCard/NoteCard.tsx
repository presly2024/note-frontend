import { MdDelete, MdEdit, MdOutlinePushPin } from "react-icons/md";
import { NoteType } from "../../utils/models";

const NoteCard = ({
     note,
     editNote,
     deleteNote,
     togglePinned,
}: {
     note: NoteType
     editNote: () => void;
     deleteNote: () => void;
     togglePinned: () => void;
}) => {
     const formatDate = (value: string | Date) => {
          const date = new Date(value);
          const options: Intl.DateTimeFormatOptions = {
               year: "numeric",
               day: "2-digit",
               month: "2-digit",
               hour: "2-digit",
               minute: "2-digit",
               hour12: true,
          };

          const formatedDate = date.toLocaleString("US", options);
          return formatedDate;
     };
     const { title, date, isPinned, tags, content } = note
     return (
          <div className="p-4 bg-white shadow-md hover:shadow-xl flex flex-col gap-2">
               <div className="flex items-center justify-between">
                    <div>
                         <h2 className="font-bold">{title}</h2>
                         <p className="text-sm text-slate-400">
                              {formatDate(date)}
                         </p>
                    </div>
                    <MdOutlinePushPin
                         onClick={togglePinned}
                         className={`cursor-pointer ${isPinned ? "text-primary" : "text-slate-400"
                              }`}
                         size={20}
                    />
               </div>
               <p className="text-slate-400">{content}</p>
               <div className="flex items-center justify-between text-slate-400 gap-5">
                    <div className="flex flex-wrap gap-1">
                         {tags.length > 0
                              ? tags.map((tag, index) => (
                                   <div
                                        className="p-1 text-sm bg-slate-200 rounded-sm"
                                        key={tag + index}
                                   >
                                        #{tag}
                                   </div>
                              ))
                              : ""}
                    </div>
                    <div className="flex items-center gap-2">
                         <MdEdit
                              size={20}
                              className="cursor-pointer"
                              onClick={editNote}
                         />
                         <MdDelete
                              size={20}
                              className="cursor-pointer hover:text-red-500"
                              onClick={deleteNote}
                         />
                    </div>
               </div>
          </div>
     );
};

export default NoteCard;
