(this["webpackJsonpfriday-cards"]=this["webpackJsonpfriday-cards"]||[]).push([[0],{13:function(e,r,t){e.exports={link:"Header_link__3rGh6",active:"Header_active__WDb58"}},17:function(e,r,t){e.exports={wrapperSingUp:"SingUp_wrapperSingUp__10c9o",error:"SingUp_error__3hVWl",itemForm:"SingUp_itemForm__2Hoqs"}},18:function(e,r,t){e.exports={wrapperLogin:"Login_wrapperLogin__7crdy",error:"Login_error__2KjR3",itemForm:"Login_itemForm__2BJK2"}},19:function(e,r,t){e.exports={wrapper:"RefreshPassword_wrapper__1w0cM",itemForm:"RefreshPassword_itemForm__211yj",sent:"RefreshPassword_sent__3-UqR",error:"RefreshPassword_error__1-Yf-"}},20:function(e,r,t){e.exports={wrapper:"SetPassword_wrapper__2NCAr",itemForm:"SetPassword_itemForm__Dzarj",error:"SetPassword_error__jBYu3"}},23:function(e,r,t){e.exports={error_block:"Error404_error_block__1S9L_",error_img:"Error404_error_img__12cse",error_text:"Error404_error_text__2UoDX",error_header:"Error404_error_header__1A5K1",error_paragraph:"Error404_error_paragraph__2qgdO"}},25:function(e,r,t){e.exports={loading:"Profile_loading__23loj",profile:"Profile_profile__1KS2C",error:"Profile_error__2vXXn"}},53:function(e,r,t){},74:function(e,r,t){},75:function(e,r,t){"use strict";t.r(r);var n=t(0),a=t(1),c=t.n(a),s=t(26),o=t.n(s),i=t(4),u=(t(53),t(6)),l=t(5),d=function(){return Object(n.jsx)(n.Fragment,{children:"Test"})},j=t(8),b=t(2),p=t(7),O=t.n(p),h=t(15),f=t(16),m=t.n(f),g=m.a.create({baseURL:"https://neko-back.herokuapp.com/2.0/",withCredentials:!0}),x=function(e){return g.post("auth/login",e).then((function(e){return e.data}))},v=function(){return g.post("auth/me",{}).then((function(e){return e.data}))},S=function(){return g.delete("auth/me").then((function(e){return e}))},_=function(e){return{type:"cards/profile/SET-USER-NAME",userName:e}},w=function(e){return{type:"cards/app/SET-IS-INITIALIZED",isInitialized:e}},E=function(e){return{type:"cards/app/SET-ERROR",errorText:e}},N={userName:null,isInitialized:!1,error:null},T=function(e){return{type:"cards/login/SET-IS-LOGGED-IN",isLogged:e}},R=function(e){return{type:"cards/login/SET-ERROR",errorText:e}},k={isLoggedIn:!1,error:null},I=t(18),P=t.n(I),y=function(){var e=Object(a.useState)("abcabc@grr.la"),r=Object(j.a)(e,2),t=r[0],c=r[1],s=Object(a.useState)("8888888888"),o=Object(j.a)(s,2),d=o[0],b=o[1],p=Object(a.useState)(!1),f=Object(j.a)(p,2),m=f[0],g=f[1],v=Object(i.c)((function(e){return e.login.isLoggedIn})),S=Object(i.c)((function(e){return e.profile.isInitialized})),N=Object(i.c)((function(e){return e.profile.userName})),k=Object(i.c)((function(e){return e.login.error})),I=Object(i.b)();Object(a.useEffect)((function(){N||(I(w(!1)),I(E(null)))}),[]);return v&&!S?Object(n.jsx)(l.a,{to:"/profile"}):Object(n.jsxs)("div",{className:P.a.wrapperLogin,children:[Object(n.jsx)("div",{className:P.a.itemForm,children:Object(n.jsx)("input",{type:"text",placeholder:"email",value:t,onChange:function(e){c(e.currentTarget.value)}})}),Object(n.jsx)("div",{className:P.a.itemForm,children:Object(n.jsx)("input",{type:"text",placeholder:"password",value:d,onChange:function(e){b(e.currentTarget.value)}})}),Object(n.jsxs)("div",{className:P.a.itemForm,children:[Object(n.jsx)("input",{type:"checkbox",checked:m,onChange:function(e){g(e.currentTarget.checked)}}),Object(n.jsx)("span",{children:"RememberMe"})]}),k&&Object(n.jsx)("div",{className:P.a.error,children:k}),Object(n.jsx)("div",{children:Object(n.jsx)(u.b,{to:ue.REFRESH,children:"Forget password?"})}),Object(n.jsx)("div",{className:P.a.itemForm,children:Object(n.jsx)("button",{onClick:function(){var e;I((e={email:t,password:d,rememberMe:m},function(){var r=Object(h.a)(O.a.mark((function r(t){var n;return O.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,x(e);case 3:n=r.sent,console.log(n),t(T(!0)),t(_(n.name)),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),t(R(r.t0.response?r.t0.response.data.error:r.t0.message?r.t0.message:"Some error occurred"));case 12:case"end":return r.stop()}}),r,null,[[0,9]])})));return function(e){return r.apply(this,arguments)}}())),I(E(null))},children:"Log In"})}),Object(n.jsx)("div",{children:Object(n.jsx)(u.b,{to:ue.SIGNUP,children:"Sign Up"})})]})},L=t(17),U=t.n(L),F=m.a.create({baseURL:"https://neko-back.herokuapp.com/2.0/"}),C=function(e){return F.post("/auth/register",e).then((function(e){return e}))},G=function(e){return{type:"cards/app/SET-STATUS",status:e}},A={status:"idle"},D=function(e){return{type:"cards/signUp/SET-ERROR",errorText:e}},H={isSignUp:!1,error:null},z=function(){var e=Object(a.useState)(""),r=Object(j.a)(e,2),t=r[0],c=r[1],s=Object(a.useState)(""),o=Object(j.a)(s,2),d=o[0],b=o[1],p=Object(a.useState)(""),f=Object(j.a)(p,2),m=f[0],g=f[1],x=Object(a.useState)(""),v=Object(j.a)(x,2),S=v[0],_=v[1],w=Object(i.c)((function(e){return e.signUp.isSignUp})),E=Object(i.c)((function(e){return e.signUp.error})),N=Object(i.c)((function(e){return e.app.status})),T=Object(i.b)();return w?Object(n.jsx)(l.a,{to:"/login"}):Object(n.jsxs)("div",{className:U.a.wrapperSingUp,children:["loading"===N&&Object(n.jsx)("div",{children:"Please wait..."}),Object(n.jsx)("div",{className:U.a.itemForm,children:Object(n.jsx)("input",{type:"text",placeholder:"email",value:t,onChange:function(e){c(e.currentTarget.value)}})}),Object(n.jsx)("div",{className:U.a.itemForm,children:Object(n.jsx)("input",{type:"text",placeholder:"password",value:d,onChange:function(e){b(e.currentTarget.value)}})}),Object(n.jsx)("div",{className:U.a.itemForm,children:Object(n.jsx)("input",{type:"text",placeholder:"Confirm password",value:m,onChange:function(e){g(e.currentTarget.value)}})}),S&&Object(n.jsx)("div",{className:U.a.error,children:S}),E&&Object(n.jsx)("div",{className:U.a.error,children:E}),Object(n.jsx)("div",{className:U.a.itemForm,children:Object(n.jsx)("button",{onClick:function(){var e,r=d.trim(),n=m.trim();r===n?r===n&&(T((e={email:t,password:d},function(){var r=Object(h.a)(O.a.mark((function r(t){var n;return O.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t(G("loading")),r.next=4,C(e);case 4:n=r.sent,t({type:"cards/signUp/SET-IS-SIGN-UP",isSignUp:!0}),console.log(n),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),t(D(r.t0.response?r.t0.response.data.error:r.t0.message?r.t0.message:"Some error occurred"));case 12:return r.prev=12,t(G("succeeded")),r.finish(12);case 15:case"end":return r.stop()}}),r,null,[[0,9,12,15]])})));return function(e){return r.apply(this,arguments)}}())),_(""),T(D(null))):_("The password values must be equal to!")},children:"Sing Up"})}),Object(n.jsx)("div",{children:Object(n.jsx)(u.b,{to:ue.LOGIN,children:"Login"})})]})},M=t(25),q=t.n(M),B=function(){var e=Object(i.c)((function(e){return e.profile.userName})),r=Object(i.c)((function(e){return e.profile.isInitialized})),t=Object(i.c)((function(e){return e.profile.error})),c=Object(i.c)((function(e){return e.login.error})),s=Object(i.c)((function(e){return e.login.isLoggedIn})),o=Object(i.b)();return Object(a.useEffect)((function(){e||o(function(){var e=Object(h.a)(O.a.mark((function e(r){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v();case 3:t=e.sent,r(_(t.name)),r(T(!0)),r(w(!0)),e.next=14;break;case 9:return e.prev=9,e.t0=e.catch(0),r(E(e.t0.response?e.t0.response.data.error:e.t0.message?e.t0.message:"Some error occurred")),e.next=14,setTimeout((function(){return r(w(!0))}),2e3);case 14:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(r){return e.apply(this,arguments)}}())}),[]),r&&!s?Object(n.jsx)(l.a,{to:"/login"}):r||s?Object(n.jsxs)("div",{className:q.a.profile,children:[e&&Object(n.jsxs)("div",{children:["Hello, ",Object(n.jsx)("span",{children:e})]}),Object(n.jsx)("div",{className:q.a.error,children:c}),Object(n.jsx)("div",{children:Object(n.jsx)("button",{onClick:function(){o(function(){var e=Object(h.a)(O.a.mark((function e(r){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S();case 3:t=e.sent,r(T(!1)),r(w(!1)),r(_(null)),console.log(t),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),r(R(e.t0.response?e.t0.response.data.error:e.t0.message?e.t0.message:"Some error occurred"));case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(r){return e.apply(this,arguments)}}())},children:"Log Out"})})]}):Object(n.jsxs)("div",{className:q.a.loading,children:[Object(n.jsx)("div",{children:"Initializing..."}),Object(n.jsx)("div",{className:q.a.error,children:t})]})},K=t(23),W=t.n(K),J=t.p+"static/media/404-error.8c0adfd2.jpg",X=function(){return Object(n.jsxs)("div",{className:W.a.error_block,children:[Object(n.jsx)("img",{className:W.a.error_img,src:J,alt:"404"}),Object(n.jsxs)("div",{className:W.a.error_text,children:[Object(n.jsx)("div",{className:W.a.error_header,children:"OOOPS! PAGE NOT FOUND..."}),Object(n.jsx)("p",{className:W.a.error_paragraph,children:"You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for."})]})]})},Y=m.a.create({baseURL:"https://neko-back.herokuapp.com/2.0/"}),Z=function(e){return Y.post("auth/forgot",{email:e,from:"test-front-admin <ai73a@yandex.by>",message:"<div style='background-color: lime; padding: 15px'> password recovery link: <a href='https://daria0109.github.io/Cards_ReactTS/#/set/$token$'> link</a></div>"}).then((function(e){return e}))},$=function(e){return{type:"cards/refreshPassword/SET-ERROR",errorText:e}},V={isEmailSent:!1,error:null},Q=t(19),ee=t.n(Q),re=function(){var e=Object(i.c)((function(e){return e.refreshPassword.isEmailSent})),r=Object(i.c)((function(e){return e.refreshPassword.error})),t=Object(i.b)(),c=Object(a.useState)(""),s=Object(j.a)(c,2),o=s[0],l=s[1];return Object(n.jsxs)("div",{className:ee.a.wrapper,children:[!e&&Object(n.jsxs)("div",{className:ee.a.editBlock,children:[Object(n.jsx)("div",{className:ee.a.itemForm,children:Object(n.jsx)("input",{placeholder:"Enter email...",value:o,onChange:function(e){l(e.currentTarget.value)}})}),Object(n.jsx)("div",{className:ee.a.itemForm,children:Object(n.jsx)("button",{onClick:function(){var e;t((e=o,function(){var r=Object(h.a)(O.a.mark((function r(t){var n;return O.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Z(e);case 3:n=r.sent,t({type:"cards/refreshPassword/SET-IS-EMAIL-SENT",isSent:!0}),console.log(n.data),r.next=13;break;case 8:r.prev=8,r.t0=r.catch(0),t($(r.t0.response?r.t0.response.data.error:r.t0.message?r.t0.message:"Some error occurred")),console.log(r.t0.response.data.error),console.log(r.t0.message);case 13:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e){return r.apply(this,arguments)}}())),t($(null))},children:"Send"})})]}),e&&Object(n.jsxs)("div",{className:ee.a.sent,children:[Object(n.jsx)("p",{children:"Success!"}),Object(n.jsx)("p",{children:"The link was sent to your email!"})]}),r&&Object(n.jsx)("div",{className:ee.a.error,children:r}),Object(n.jsx)("div",{children:Object(n.jsx)(u.b,{to:ue.LOGIN,children:"Login"})})]})},te=m.a.create({baseURL:"https://neko-back.herokuapp.com/2.0/"}),ne=function(e,r){return te.post("auth/set-new-password",{password:e,resetPasswordToken:r}).then((function(e){return e}))},ae=function(e){return{type:"cards/error/SET-ERROR",errorText:e}},ce={isPasswordChanged:!1,error:null},se=t(20),oe=t.n(se),ie=function(){var e=Object(i.c)((function(e){return e.setPassword.isPasswordChanged})),r=Object(i.c)((function(e){return e.setPassword.error})),t=Object(i.b)(),c=Object(l.g)().token,s=Object(a.useState)(""),o=Object(j.a)(s,2),u=o[0],d=o[1],b=Object(a.useState)(""),p=Object(j.a)(b,2),f=p[0],m=p[1],g=Object(a.useState)(""),x=Object(j.a)(g,2),v=x[0],S=x[1];return e?Object(n.jsx)(l.a,{to:"/login"}):Object(n.jsxs)("div",{className:oe.a.wrapper,children:[Object(n.jsx)("div",{className:oe.a.itemForm,children:Object(n.jsx)("input",{placeholder:"New password...",value:u,onChange:function(e){d(e.currentTarget.value)}})}),Object(n.jsx)("div",{className:oe.a.itemForm,children:Object(n.jsx)("input",{placeholder:"Confirm password...",value:f,onChange:function(e){m(e.currentTarget.value)}})}),v&&Object(n.jsx)("div",{className:oe.a.error,children:v}),r&&Object(n.jsx)("div",{className:oe.a.error,children:r}),Object(n.jsx)("div",{className:oe.a.itemForm,children:Object(n.jsx)("button",{onClick:function(){var e=u.trim(),r=f.trim();e||r?e===r?c?c&&e===r&&(t(function(e,r){return function(){var t=Object(h.a)(O.a.mark((function t(n){var a;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,ne(e,r);case 3:a=t.sent,n({type:"cards/setPassword/SET-IS-PASSWORD-CHANGED",isChanged:!0}),console.log(a),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(0),n(ae(t.t0.response?t.t0.response.data.error:t.t0.message?t.t0.message:"Some error occurred")),console.log(t.t0.response.data.error),console.log(t.t0.message);case 13:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}(e,c)),S(""),t(ae(null))):S("Send your email on Refresh Page!"):S("The password values must be equal to!"):S("Password is required")},children:"Set new Password"})})]})},ue={TEST:"/test",LOGIN:"/login",SIGNUP:"/signup",PROFILE:"/profile",REFRESH:"/refresh",SET:"/set/:token",ERROR404:"/404"},le=function(){return Object(n.jsx)("div",{children:Object(n.jsxs)(l.d,{children:[Object(n.jsx)(l.b,{path:"/",exact:!0,render:function(){return Object(n.jsx)(l.a,{to:ue.PROFILE})}}),Object(n.jsx)(l.b,{path:ue.LOGIN,render:function(){return Object(n.jsx)(y,{})}}),Object(n.jsx)(l.b,{path:ue.TEST,render:function(){return Object(n.jsx)(d,{})}}),Object(n.jsx)(l.b,{path:ue.SIGNUP,render:function(){return Object(n.jsx)(z,{})}}),Object(n.jsx)(l.b,{path:ue.PROFILE,render:function(){return Object(n.jsx)(B,{})}}),Object(n.jsx)(l.b,{path:ue.REFRESH,render:function(){return Object(n.jsx)(re,{})}}),Object(n.jsx)(l.b,{path:"/set",exact:!0,render:function(){return Object(n.jsx)(ie,{})}}),Object(n.jsx)(l.b,{path:ue.SET,render:function(){return Object(n.jsx)(ie,{})}}),Object(n.jsx)(l.b,{path:ue.ERROR404,render:function(){return Object(n.jsx)(X,{})}}),Object(n.jsx)(l.b,{render:function(){return Object(n.jsx)(l.a,{to:ue.ERROR404})}})]})})},de=t(13),je=t.n(de),be=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u.b,{to:ue.TEST,className:je.a.link,activeClassName:je.a.active,children:"Test Page"}),Object(n.jsx)(u.b,{to:ue.PROFILE,className:je.a.link,activeClassName:je.a.active,children:"Profile"}),Object(n.jsx)(u.b,{to:ue.LOGIN,className:je.a.link,activeClassName:je.a.active,children:"Login"}),Object(n.jsx)(u.b,{to:ue.SIGNUP,className:je.a.link,activeClassName:je.a.active,children:"Sign Up"}),Object(n.jsx)(u.b,{to:ue.REFRESH,className:je.a.link,activeClassName:je.a.active,children:"Refresh password"}),Object(n.jsx)(u.b,{to:"/set",className:je.a.link,activeClassName:je.a.active,children:"Set password"})]})},pe=(t(74),function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)(u.a,{children:[Object(n.jsx)(be,{}),Object(n.jsx)(le,{})]})})}),Oe=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,76)).then((function(r){var t=r.getCLS,n=r.getFID,a=r.getFCP,c=r.getLCP,s=r.getTTFB;t(e),n(e),a(e),c(e),s(e)}))},he=t(22),fe={},me=t(43),ge=Object(he.c)({testPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe;return e},login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case"cards/login/SET-ERROR":return Object(b.a)(Object(b.a)({},e),{},{error:r.errorText});case"cards/login/SET-IS-LOGGED-IN":return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:r.isLogged});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case"cards/profile/SET-USER-NAME":return Object(b.a)(Object(b.a)({},e),{},{userName:r.userName});case"cards/app/SET-IS-INITIALIZED":return Object(b.a)(Object(b.a)({},e),{},{isInitialized:r.isInitialized});case"cards/app/SET-ERROR":return Object(b.a)(Object(b.a)({},e),{},{error:r.errorText});default:return Object(b.a)({},e)}},signUp:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case"cards/signUp/SET-IS-SIGN-UP":return Object(b.a)(Object(b.a)({},e),{},{isSignUp:r.isSignUp});case"cards/signUp/SET-ERROR":return Object(b.a)(Object(b.a)({},e),{},{error:r.errorText});default:return e}},setPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case"cards/setPassword/SET-IS-PASSWORD-CHANGED":return Object(b.a)(Object(b.a)({},e),{},{isPasswordChanged:r.isChanged});case"cards/error/SET-ERROR":return Object(b.a)(Object(b.a)({},e),{},{error:r.errorText});default:return e}},refreshPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case"cards/refreshPassword/SET-IS-EMAIL-SENT":return Object(b.a)(Object(b.a)({},e),{},{isEmailSent:r.isSent});case"cards/refreshPassword/SET-ERROR":return Object(b.a)(Object(b.a)({},e),{},{error:r.errorText});default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case"cards/app/SET-STATUS":return Object(b.a)(Object(b.a)({},e),{},{status:r.status});default:return Object(b.a)({},e)}}}),xe=Object(he.d)(ge,Object(he.a)(me.a));window.store=xe,o.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(i.a,{store:xe,children:Object(n.jsx)(pe,{})})}),document.getElementById("root")),Oe()}},[[75,1,2]]]);
//# sourceMappingURL=main.049b34e3.chunk.js.map