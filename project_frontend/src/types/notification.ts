export type NotificationType = {
  _id: string;
  message: string;
  read: boolean;
  recipient: {
    _id: string;
    name: string;
    email: string;
  };
};