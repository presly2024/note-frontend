import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/noteCard/NoteCard";
import Modal from "react-modal";
import NoteForm from "../../components/noteForm/NoteForm";
import { useEffect, useState } from "react";
import { ModalInfo } from "../../utils/models";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Home = ({ setUserInfo }: { setUserInfo: any }) => {
     const navigate = useNavigate();
     const [notes, setNotes] = useState<any>([]);
     const getUserInfo = async () => {
          try {
               const response = await axiosInstance.get("/user/");
               if (response) {
                    setUserInfo(response.data.user);
               }
          } catch (error: any) {
               if (error.response.status == 401) {
                    localStorage.clear();
                    navigate("/login");
               }
          }
     };

     const getNotes = async () => {
          try {
               const response = await axiosInstance.get("/note/");
               if (response) {
                    setNotes(response.data);
               }
          } catch (error: any) {
               if (error.response.status == 401) {
                    localStorage.clear();
                    navigate("/login");
               }
          }
     };

     useEffect(() => {
          getUserInfo();
          getNotes();
     }, []);

     const [showAddEditModal, setShowAddEditModal] = useState<ModalInfo>({
          show: false,
          type: "add",
          data: null,
     });

     const onCloseModal = () =>
          setShowAddEditModal({
               type: "add",
               data: null,
               show: false,
          });
     const deleteNote = async (id: string) => {
          try {
               const response: any = await axiosInstance.delete(
                    `/note/delete/${id}`
               );
               const { _id } = response.data;
               setNotes((prev: any) => {
                    const newNotes = prev.filter(
                         (note: any) => note._id !== _id
                    );
                    return newNotes;
               });
          } catch (error: any) {
               if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
               ) {
                    alert(error.response.data.msg);
               } else {
                    alert("An unexpected error occured");
               }
          }
     };

     const togglePinned = async (id: string) => {
          try {
               const response: any = await axiosInstance.patch(
                    `/note/pin/${id}`
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
          } catch (error: any) {
               if (
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
               ) {
                    alert(error.response.data.msg);
               } else {
                    alert("An unexpected error occured");
               }
          }
     };
     return (
          <>
               <Modal
                    ariaHideApp={false}
                    isOpen={showAddEditModal.show}
                    onRequestClose={onCloseModal}
                    style={{
                         overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                    }}
                    className="bg-white w-[80%] mx-auto max-h-3/4 mt-48 rounded-lg overflow-hidden"
               >
                    <NoteForm
                         setNotes={setNotes}
                         modalInfo={showAddEditModal}
                         onCloseModal={onCloseModal}
                    />
               </Modal>

               {notes.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-5 p-5">
                         {notes.map((note: any) => (
                              <NoteCard
                                   key={note._id}
                                   content={note.content}
                                   isPinned={note.isPinned}
                                   date={note.date}
                                   tags={note.tags}
                                   title={note.title}
                                   editNote={() =>
                                        setShowAddEditModal({
                                             type: "edit",
                                             data: {
                                                  id: note._id,
                                                  title: note.title,
                                                  content: note.content,
                                                  tags: note.tags,
                                             },
                                             show: true,
                                        })
                                   }
                                   deleteNote={() => deleteNote(note._id)}
                                   togglePinned={() => togglePinned(note._id)}
                              />
                         ))}
                    </div>
               ) : (
                    <p className="text-center p-4 text-3xl">No Notes</p>
               )}
               <button
                    className="bg-primary fixed right-5 text-white font-bold text-xl w-16 h-16 rounded-xl flex items-center justify-center shadow-xl bottom-5"
                    onClick={() =>
                         setShowAddEditModal({
                              ...showAddEditModal,
                              show: true,
                         })
                    }
               >
                    <MdAdd size={40} />
               </button>
          </>
     );
};

export default Home;
