export type Message = {
  _id: string;
  sender:{
    _id: string;
    name: string;
    email: string;
  },
  text: string,
  createdAt: string;
};


export type MessageFormValues = {
  message: string;
};

