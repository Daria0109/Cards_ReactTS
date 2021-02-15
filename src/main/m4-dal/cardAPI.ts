import axios from "axios";

const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'

const instance = axios.create({
	baseURL: baseLocalhostURL,
	withCredentials: true,
})

export const cardAPI = {
	getCard(pageCount: number) {
		return instance.get(`cards/pack?&pageCount=${pageCount}` )
		//return instance.get(`cards/pack` ) bla
	}
}