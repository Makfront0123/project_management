import type { User } from "./auth";
import type { Task } from "./task";


export interface TaskAssignment {
  _id: string;
  taskId: Task;
  userId: User;     
  assignedBy: string; 
  createdAt: string;
  updatedAt: string;
}
