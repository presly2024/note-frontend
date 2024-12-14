export type NoteType = {
     _id?: string | object;
     creatorId: string | object;
     title: string;
     content: string;
     tags: string[];
     date: Date | string;
     isPinned: boolean;
};

export type ModalInfo = { data: NoteType | null; type: string; show: boolean };

export type UserType = {
     _id: string | object;
     name: string;
     email: string;
     password: string;
};
