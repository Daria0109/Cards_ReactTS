import axios from "axios";
import {LoginDataType, RegDataType} from '../m3-bll/auth-reducer';

const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'

const instance = axios.create({
	baseURL: baseHerokuURL,
	withCredentials: true,
})

type ResponseUserType = {
	created: string
	email: string
	isAdmin: boolean
	name: string
	publicCardPacksCount: number
	rememberMe: boolean
	token: string
	tokenDeathTime: string
	updated: string
	verified: boolean
	__v: number
	_id: string
}
type ResponseUpdatedUserType = {
	token: string
	tokenDeathTime: number
	updatedUser: ResponseUserType
}


export const authAPI = {
	signUp(registrationData: RegDataType) {
		return instance.post("auth/register", registrationData)
			.then(res => res)
	},
	me() {
		return instance.post<ResponseUserType>("auth/me", {})
			.then(res => res.data)
	},
	login(loginData: LoginDataType) {
		return instance.post<ResponseUserType>("auth/login", loginData)
			.then(res => res.data)
	},
	logout() {
		return instance.delete('auth/me')
			.then(res => res)
	},
	sendEmail(email: string) {
		return instance.post('auth/forgot', {
			email: email,
			from: 'test-front-admin <ai73a@yandex.by>',
			message: '<div style=\'background-color: lime; padding: 15px\'>' +
				' password recovery link:' +
				' <a href=\'https://daria0109.github.io/Cards_ReactTS/#/set/$token$\'> link</a></div>'
		}).then(res => res)
	},
	setPassword(password: string, token: string) {
		return instance.post('auth/set-new-password', {
			password,
			resetPasswordToken: token
		}).then(res => res)
	},
	updateUserName(name: string) {
		return instance.put<ResponseUpdatedUserType>('auth/me', {name})
			.then(res => res.data)
	},
}
