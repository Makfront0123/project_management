

export interface AuthResponse {
  message: string
  user: {
    _id: string
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
  image?: string | "https://tse4.mm.bing.net/th/id/OIP.z2F78QVOUPcyHRhXTYGSyAHaHa?pid=Api&P=0&h=180"
}


export type JwtPayload = {
  id: string
  email: string
  name: string
  image: string
  exp: number
  iat: number
}



export interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

