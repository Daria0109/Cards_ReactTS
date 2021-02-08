import axios from 'axios'

const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'

const instance = axios.create({
  baseURL: baseLocalhostURL,
})

export const setPasswordAPI = {
  setPassword(password: string, token: string) {
    return instance.post('auth/set-new-password', {
      password,
      resetPasswordToken: token
      }).then(res => res)
  }
}