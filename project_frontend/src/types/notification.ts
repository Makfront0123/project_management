export type NotificationType = {
 
  message: string;
  read: boolean;
  recipient: {
    _id: string;
    name: string;
    email: string;
  };
  teamId: string;
};