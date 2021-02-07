import axios from "axios";
import {regData} from "../m3-bll/signup-reducer";

const instance = axios.create({
	baseURL: "http://localhost:7542/2.0/",
	//baseURL: "https://neko-back.herokuapp.com/2.0",
})

type responseData<T> = {
	addedUser: {}
	error: T
}
// {"error":"not valid email/password /ᐠ-ꞈ-ᐟ\\",
// 	"in":"createUser",
// 	"isEmailValid":true,
// 	"isPassValid":false,
// 	"emailRegExp":{},
// 	"passwordRegExp":"Password must be more than 7 characters..."
//}

// {"error":"email already exists /ᐠ｡ꞈ｡ᐟ\\",
// 	"email":"sergdiag19@gmail.com","in":"createUser"
// }

// {"addedUser":
// 	{"_id":"60204ac65c268c2adcce842e"
// 		,"email":"123412312412@mail.ru",
// 		"rememberMe":false,
// 		"isAdmin":false,
// 		"name":"123412312412@mail.ru",
// 		"verified":false,
// 		"publicCardPacksCount":0,
// 		"created":"2021-02-07T20:17:10.756Z",
// 		"updated":"2021-02-07T20:17:10.756Z",
// 		"__v":0
// 	}
// }

// config: {url: "/auth/register", method: "post", data: "{"email":"sergdiag1@gmail.com","password":"11111111"}", headers: {…}, baseURL: "http://localhost:7542/2.0/", …}
// data:
// 	addedUser: {_id: "60203eae5c268c2adcce842b", email: "sergdiag1@gmail.com", rememberMe: false, isAdmin: false, name: "sergdiag1@gmail.com", …}
// __proto__: Object
// headers: {content-length: "266", content-type: "application/json; charset=utf-8"}
// request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
// status: 201
// statusText: "Created"

export const registrationAPI = {
	registrationMe(registrationData: regData) {
		return instance.post<responseData<{ error: string }>>("/auth/register", registrationData)
	}
}