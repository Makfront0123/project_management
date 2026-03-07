export type Message = {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  receiver?: {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
  } | null;
  attachments?: string;
  text: string;
  createdAt: string;
};

export type MessageFormValues = {
  message: string;
};

