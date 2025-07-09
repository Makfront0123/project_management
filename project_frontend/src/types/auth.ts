export interface User {

  email: string

}

export interface AuthResponse {
  message: string
  user: {
    email: string
    password: string
    token: string
  }
}
