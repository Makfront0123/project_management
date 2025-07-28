 

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
  name: string;
}
export type User = {
    id: string
    email: string
    name: string
    image: string
}


export type JwtPayload = {
    id: string
    email: string
    name: string
    image: string
    exp: number
    iat: number
}





