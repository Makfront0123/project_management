import type { User } from "@/features/auth/types/auth";

 
export interface TaskComment {
  _id: string;
  comment: string;
  taskId: string;
  userId: User;
  createdAt: string;
  updatedAt: string;
}
