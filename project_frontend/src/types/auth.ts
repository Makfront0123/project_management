export interface User {
  _id: string;
  name: string;
  email: string;
}


export interface AuthResponse {
  message: string
  user: {
    email: string
    password: string
    token: string
  }
}

export interface RegisterResponse {
  message?: string;
  _id: string;
  email: string;
}





