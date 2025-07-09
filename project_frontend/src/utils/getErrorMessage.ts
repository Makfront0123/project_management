import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message
    if (msg && typeof msg === 'string') return msg
  }

  if (error instanceof Error) return error.message
  return "An unexpected error occurred"
}
