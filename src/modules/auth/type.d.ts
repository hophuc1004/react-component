interface validateEmail {
  data: boolean
  message: string
  statusCode: number
}

interface AccountPayload {
  email: string
  password: string
  confirmPassword: string
}

interface SetupRespone {
  statusCode: number
  message: string
  data?: boolean
  error?: Array<any>
}
