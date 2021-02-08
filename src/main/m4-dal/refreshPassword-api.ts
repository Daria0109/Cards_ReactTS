import axios from 'axios'

const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'

const instance = axios.create({
  baseURL: baseHerokuURL,
})

export const refreshPasswordAPI = {
  refresh(email: string) {
    return instance.post('auth/forgot', {
      email: email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: '<div style=\'background-color: lime; padding: 15px\'>' +
        ' password recovery link:' +
        ' <a href=\'http://localhost:3000/#/set/$token$\'> link</a></div>'
    }).then(res => res)
  }
}