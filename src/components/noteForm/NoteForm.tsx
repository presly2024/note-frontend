import { SyntheticEvent, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import Tag from "../tag/Tag";
import { ModalInfo } from "../../utils/models";
import axiosInstance from "../../utils/axiosInstance";

const NoteForm = ({
     onCloseModal,
     modalInfo,
     setNotes,
}: {
     onCloseModal: () => void;
     modalInfo: ModalInfo;
     setNotes: any;
}) => {
     const [tag, setTag] = useState("");
     const [tags, setTags] = useState<string[]>(() => {
          if (modalInfo.type !== "add" && modalInfo.data) {
               return modalInfo.data.tags;
          }
          return [];
     });
     const [title, setTitle] = useState(() => {
          if (modalInfo.type !== "add" && modalInfo.data) {
               return modalInfo.data.title;
          }
          return "";
     });
     const [content, setContent] = useState(() => {
          if (modalInfo.type !== "add" && modalInfo.data) {
               return modalInfo.data.content;
          }
          return "";
     });

     const [error, setError] = useState<string | null>(null);

     const handleAddTag = () => {
          if (!tag) return;
          setTags((prev) => [...prev, tag]);
          setTag("");
     };

     const handleCreateNote = async (event: SyntheticEvent) => {
          event.preventDefault();

          if (!title) return setError("title is required");
          if (!content) return setError("content is required");

          const note = {
               title,
               content,
               tags,
          };

          try {
               const response: any = await axiosInstance.post(
                    "/note/create",
                    note
               );
               const newNote = response.data;
               setNotes((prev: any) => [...prev, newNote]);
               setContent("");
               setTitle("");
               setTags([]);
               setError("");
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

     const handleEdiitNote = async (event: SyntheticEvent) => {
          event.preventDefault();

          if (!title) return setError("title is required");
          if (!content) return setError("content is required");

          const note = {
               title,
               content,
               tags,
          };

          try {
               const response: any = await axiosInstance.put(
                    `/note/edit/${modalInfo?.data?.id}`,
                    note
               );
               const newNote = response.data;
               setNotes((prev: any) => {
                    const newNotes = prev.map((note: any) => {
                         if (note._id === newNote?._id) {
                              note = { ...newNote };
                              return note;
                         }
                         return note;
                    });
                    return newNotes;
               });
               setContent("");
               setTitle("");
               setTags([]);
               setError("");
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

     const handleRemoveTag = (tag: string) => {
          const newTags = tags.filter((item) => item !== tag);
          setTags(newTags);
     };
     return (
          <div className="bg-transparent p-5 relative">
               <MdClose
                    size={20}
                    className="text-slate-300 absolute right-5 top-5 cursor-pointer"
                    onClick={onCloseModal}
               />
               <form
                    onSubmit={
                         modalInfo.type === "add"
                              ? handleCreateNote
                              : handleEdiitNote
                    }
               >
                    <div className="mb-3">
                         <label
                              htmlFor="title"
                              className="text-sm text-slate-400 uppercase block mb-[10px]"
                         >
                              Title
                         </label>
                         <input
                              value={title}
                              type="text"
                              className="text-sm w-full border rounded-sm px-5 py-2 outline-none"
                              id="title"
                              placeholder="Title"
                              onChange={({ target: { value } }) =>
                                   setTitle(value)
                              }
                         />
                    </div>
                    <div className="mb-3">
                         <label
                              htmlFor="content"
                              className="text-sm text-slate-400 uppercase block mb-[10px]"
                         >
                              Content
                         </label>
                         <textarea
                              value={content}
                              rows={10}
                              className="outline-none bg-slate-100 w-full px-5 py-2 rounded-md"
                              placeholder="Content"
                              id="content"
                              onChange={({ target: { value } }) =>
                                   setContent(value)
                              }
                         ></textarea>
                    </div>
                    <div className="mb-3">
                         <label
                              htmlFor="tag"
                              className="text-sm text-slate-400 uppercase block mb-[10px]"
                         >
                              Tags
                         </label>
                         <div className="flex flex-wrap gap-1 mb-[10px]">
                              {tags.length > 0
                                   ? tags.map((tag, index) => (
                                          <Tag
                                               key={tag + index}
                                               tag={tag}
                                               handleRemoveTag={() =>
                                                    handleRemoveTag(tag)
                                               }
                                          />
                                     ))
                                   : ""}
                         </div>
                         <div className="flex items-center gap-2">
                              <input
                                   value={tag}
                                   type="text"
                                   className="border w-52 text-sm py-2 px-5 rounded-sm outline-none"
                                   id="tag"
                                   placeholder="Add tags"
                                   onChange={({ target: { value } }) =>
                                        setTag(value)
                                   }
                              />
                              <button
                                   type="button"
                                   className="w-9 h-9 rounded-md border-2 flex items-center justify-center border-primary"
                                   onClick={handleAddTag}
                              >
                                   <MdAdd size={20} className="text-primary" />
                              </button>
                         </div>
                    </div>
                    {error && (
                         <p className="text-sm text-red-500 mb-4">{error}</p>
                    )}
                    <button className="btn-primary font-bold uppercase">
                         {modalInfo.type === "add" ? "ADD" : "Update NOTE"}
                    </button>
               </form>
          </div>
     );
};

export default NoteForm;
