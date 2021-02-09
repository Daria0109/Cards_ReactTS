import axios from "axios";
import {loginData} from "../m3-bll/login-reducer";

const instance = axios.create({
	baseURL: "http://localhost:7542/2.0/",
	//baseURL: "https://neko-back.herokuapp.com/2.0",
})

type responseLoginType = {
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

// created: "2021-02-07T19:05:49.207Z"
// email: "sergdiag19@gmail.com"
// isAdmin: false
// name: "sergdiag19@gmail.com"
// publicCardPacksCount: 0
// rememberMe: false
// token: "44e9b950-6af2-11eb-a3aa-43f1dde77f4b"
// tokenDeathTime: 1612898233573
// updated: "2021-02-09T16:17:13.574Z"
// verified: false
// __v: 0
// _id: "60203a0d5c268c2adcce842a"

export const loginAPI = {
	login(loginData: loginData) {
		return instance.post<responseLoginType>("auth/login", loginData)
	}
}