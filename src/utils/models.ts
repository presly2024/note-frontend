type Data = {
     id: string;
     title: string;
     content: string;
     tags: string[];
};

export type ModalInfo = { data: null | Data; type: string; show: boolean };
