import type { User } from "../../features/auth/types/auth";
import type { Task } from "./task";


export interface TaskAssignment {
  _id: string;
  taskId: Task;
  userId: User;     
  assignedBy: string; 
  createdAt: string;
  updatedAt: string;
}
