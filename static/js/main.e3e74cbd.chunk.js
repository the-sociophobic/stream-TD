(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{33:function(e,t,n){e.exports=n.p+"static/media/logo.2e5601ef.svg"},34:function(e,t,n){e.exports=n.p+"static/media/logo-small.babf93f8.svg"},38:function(e,t,n){e.exports=n(66)},65:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(30),s=n.n(o),c=n(3),u=n(4),i=n(5),l=n(36),d=n(1),p=n(2),m=n.n(p),f=n(8),v=n(10),h=n.n(v),b=function e(t){var n=this;Object(c.a)(this,e),this.getSessionInfo=Object(f.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get(n.props.DBlink);case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e)}))),this.login=function(){var e=Object(f.a)(m.a.mark((function e(t,a){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post(n.props.DBlink+"/login",{ticket:t});case 2:return r=e.sent.data,console.log(r),"real"===r.token&&("real"===r.secondUser?a&&a():setInterval(Object(f.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.getSessionInfo();case 2:"real"===e.sent.secondUser&&a&&a();case 4:case"end":return e.stop()}}),e)}))),2e3)),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),this.audioURL=function(){return n.props.DBlink+"/stream"},this.logout=Object(f.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get(n.props.DBlink+"/logout");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),this.props=t,h.a.defaults.headers.post.Accept="*/*",h.a.defaults.headers.post["Content-Type"]="json",h.a.defaults.withCredentials=!0},k=r.a.createContext("new store()"),_=function(e){return r.a.createElement("a",{className:e.className,href:e.to,target:e.newTab?"_blank":"",rel:"noopener noreferrer"},e.children)},g=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={},e.render=function(){return r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"container"},r.a.createElement("b",null,"Not to scale")))},e}return n}(r.a.Component),E=n(37),y=n(12),w=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).focus=function(){return a.inputFieldRef.current&&a.inputFieldRef.current.focus()},a.blur=function(){return a.inputFieldRef.current&&a.inputFieldRef.current.blur()},a.onKeyDown=function(e){var t=""+a.props.value;a.props.number&&a.props.value&&t.match(/[^0-9]/g)&&a.props.onChange(t.replace(/[^0-9]/g,"")),a.props.onKeyDown&&a.props.onKeyDown(e)},a.onFocus=function(e){a.props.onFocus&&a.props.onFocus(e)},a.onBlur=function(e){a.props.onBlur&&a.props.onBlur(e)},a.render=function(){return r.a.createElement("div",{className:"form-group "+a.props.className+" "+(a.props.errorMessage&&"form-group--error")},r.a.createElement("input",{ref:a.inputFieldRef,type:a.props.password?"password":"text",className:"form-group__input ".concat(a.props.className),placeholder:a.props.placeholder,required:a.props.required,value:a.props.value,onChange:function(e){return a.props.onChange(e.target.value)},onFocus:a.onFocus,onBlur:a.onBlur,onKeyDown:a.onKeyDown,disabled:a.props.disabled}),a.props.label&&r.a.createElement("label",{className:"form-group__label"},a.props.label))},a.inputFieldRef=e.inputFieldRef||r.a.createRef(),a}return n}(a.Component),x=function(e){return e>9?e:"0".concat(e)},N=function(e){return"".concat(x(Math.floor(e/60)),":").concat(x(Math.floor(e%60)))},j=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).componentDidMount=function(){return a.getSessionInfo()},a.getSessionInfo=Object(f.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.context.store.getSessionInfo();case 2:t=e.sent,a.setState({authorised:t.token,secondUser:t.secondUser,ticket:t.ticket||""}),"real"===t.token&&setTimeout((function(){return a.login()}),500);case 5:case"end":return e.stop()}}),e)}))),a.login=Object(f.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({authorised:"pending",secondUser:"pending"}),e.next=3,a.context.store.login(a.state.ticket,(function(){return a.setState({secondUser:"real"})}));case 3:"real"===(t=e.sent).token?a.setState({authorised:"real",ticket:t.ticket,texts:t.texts,left:t.left}):a.setState({authorised:t.token});case 5:case"end":return e.stop()}}),e)}))),a.pressButton=function(){switch(a.state.buttonStatus){case"never-pressed":return a.audio=new Audio(a.context.store.audioURL()),a.audio.addEventListener("canplaythrough",(function(){return"can-restart"!==a.state.buttonStatus&&setTimeout((function(){return a.setState({buttonStatus:"can-play",buttonDisabled:!1,message:"00:00/".concat(N(a.audio.duration)),comment:r.a.createElement(r.a.Fragment,null,"\u041d\u0430\u0436\u043c\u0438\u0442\u0435 ",r.a.createElement("div",{className:"play-symbol"})," \u0447\u0442\u043e\u0431\u044b ",r.a.createElement("br",null),"\u043d\u0430\u0447\u0430\u0442\u044c \u0441\u043f\u0435\u043a\u0442\u0430\u043a\u043b\u044c")})}),1e3)})),a.audio.addEventListener("ended",(function(){return setTimeout((function(){a.playInterval&&clearInterval(a.playInterval),a.setState({buttonStatus:"buy-another-ticket",comment:"\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440! \u0425\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0435\u0449\u0451, \u043a\u0443\u043f\u0438\u0442\u0435 \u0431\u0438\u043b\u0435\u0442"}),a.context.store.logout()}),5e3)})),void a.setState({buttonStatus:"buffering",message:"\u0411\u0443\u0444\u0435\u0440\u0438\u0437\u0430\u0446\u0438\u044f...",buttonDisabled:!0});case"can-play":a.play()}},a.restart=function(){a.audio.pause(),a.audio.currentTime=0,a.playInterval&&(clearInterval(a.playInterval),a.playInterval=null),a.play()},a.play=function(){a.playInterval||(a.setState({buttonStatus:"can-restart",buttonDisabled:!0,message:"".concat(N(a.audio.currentTime),"/").concat(N(a.audio.duration)),comment:r.a.createElement(r.a.Fragment,null,"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0441\u043f\u0435\u043a\u0442\u0430\u043a\u043b\u044c ",r.a.createElement("br",null),"\u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0438 \u043f\u0435\u0440\u0432\u044b\u0445 30 \u0441\u0435\u043a\u0443\u043d\u0434")}),a.playInterval=setInterval((function(){a.audio.currentTime>30&&"can-restart"===a.state.buttonStatus&&a.setState({buttonStatus:"in-process",comment:""}),a.setState({message:"".concat(N(a.audio.currentTime),"/").concat(N(a.audio.duration))})}),1e3),a.audio.play())},a.buyAnotherTicket=function(){window.open("https://tochkadostupa.spb.ru/events/not_to_scale","_blank").focus()},a.renderLogin=function(){var e,t=a.state.authorised&&a.state.authorised.match(/outdated|many-devices|fake/gm);switch(a.state.authorised){case"outdated":e="\u0411\u0438\u043b\u0435\u0442 \u0441 \u0442\u0430\u043a\u0438\u043c \u043d\u043e\u043c\u0435\u0440\u043e\u043c \u0443\u0436\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d";break;case"many-devices":e="\u0411\u0438\u043b\u0435\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043d\u0430 \u0431\u043e\u043b\u0435\u0435 \u0447\u0435\u043c 3\u0445 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430\u0445";break;case"fake":e="\u0411\u0438\u043b\u0435\u0442\u0430 \u0441 \u0442\u0430\u043a\u0438\u043c \u043d\u043e\u043c\u0435\u0440\u043e\u043c \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442";break;default:e="\u041d\u0430\u0447\u0430\u0442\u044c"}return r.a.createElement("div",{className:"spekt__login"},r.a.createElement("div",{className:"spekt__login__desc"},r.a.createElement("b",null,"Not to scale")," \u2014 \u044d\u0442\u043e \u0441\u043f\u0435\u043a\u0442\u0430\u043a\u043b\u044c \u042d\u043d\u0442\u0430 \u0425\u044d\u043c\u043f\u0442\u043e\u043d\u0430 \u0438 \u0422\u0438\u043c\u0430 \u042d\u0442\u0447\u0435\u043b\u0441\u0430. \u0412\u0430\u043c \u043f\u043e\u043d\u0430\u0434\u043e\u0431\u044f\u0442\u0441\u044f \u043d\u0430\u0443\u0448\u043d\u0438\u043a\u0438, \u043a\u0430\u0440\u0430\u043d\u0434\u0430\u0448, \u043b\u0430\u0441\u0442\u0438\u043a, \u0438 \u043b\u0438\u0441\u0442 \u0431\u0443\u043c\u0430\u0433\u0438. \u0418 \u0432\u0442\u043e\u0440\u043e\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0432\u0430\u0448\u0435\u0433\u043e \u0431\u0438\u043b\u0435\u0442\u0430, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0443 \xab\u043d\u0430\u0447\u0430\u0442\u044c\xbb \u0438 \u0441\u043b\u0435\u0434\u0443\u0439\u0442\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u044f\u043c."),r.a.createElement(w,{className:t&&"form-group__input--danger",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0432\u0430\u0448\u0435\u0433\u043e \u0431\u0438\u043b\u0435\u0442\u0430",value:a.state.ticket,onChange:function(e){return a.setState({ticket:e,authorised:""})}}),r.a.createElement("button",{className:"button button--main ".concat(t&&"button--main--danger"),onClick:function(){return a.login()},disabled:!a.state.ticket||a.state.ticket.length<5},e))},a.renderSpekt=function(){return r.a.createElement("div",{className:"spekt__spekt"},r.a.createElement("div",{className:"spekt__spekt__instructions"},"1. \u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0443 \xab\u043d\u0430\u0447\u0430\u0442\u044c\xbb \u043e\u0434\u043d\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u0441\u043e \u0432\u0442\u043e\u0440\u044b\u043c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c.",r.a.createElement("br",null),"2. \u041f\u043e\u0441\u043b\u0435 \u043d\u0430\u0436\u0430\u0442\u0438\u044f \u043d\u0430\u0447\u043d\u0451\u0442\u0441\u044f \u043e\u0431\u0440\u0430\u0442\u043d\u044b\u0439 \u043e\u0442\u0441\u0447\u0451\u0442, \u0432\u0430\u043c \u043d\u0443\u0436\u043d\u043e \u043d\u0430\u0436\u0430\u0442\u044c \u0432\u0442\u043e\u0440\u043e\u0439 \u0440\u0430\u0437 \u043d\u0430 play \u043c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e \u043e\u0434\u043d\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e",r.a.createElement("br",null),"3. \u041e\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u0435, \u0447\u0442\u043e \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0441\u043f\u0435\u043a\u0442\u0430\u043a\u043b\u044c \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u043e \u043f\u043e \u043e\u0434\u043d\u043e\u043c\u0443 \u0431\u0438\u043b\u0435\u0442\u0443 \u0443 \u0432\u0430\u0441 \u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0441\u044f"),r.a.createElement("div",{className:"spekt__spekt__player"},r.a.createElement("div",{className:"spekt__spekt__player__button-area"},r.a.createElement("button",{className:"spekt__spekt__player__button",onClick:function(){return a.pressButton()},disabled:a.state.buttonDisabled})),r.a.createElement("div",{className:"spekt__spekt__player__text"},a.state.message),r.a.createElement("div",{className:"spekt__spekt__player__comment"},"can-restart"===a.state.buttonStatus&&r.a.createElement("button",{className:"spekt__spekt__player__comment__restart",onClick:function(){return a.restart()}},"\u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c"),"buy-another-ticket"===a.state.buttonStatus&&r.a.createElement("button",{className:"spekt__spekt__player__comment__restart",onClick:function(){return a.buyAnotherTicket()}},"\u043a\u0443\u043f\u0438\u0442\u044c \u0435\u0449\u0451 \u043e\u0434\u0438\u043d \u0431\u0438\u043b\u0435\u0442"),r.a.createElement("div",{className:"spekt__spekt__player__comment__text"},a.state.comment))))},a.render=function(){return r.a.createElement(r.a.Fragment,null,a.state.authorised&&!a.state.authorised.match(/none|outdated|many-devices|fake/gm)&&r.a.createElement(g,null),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"spekt"},"real"===a.state.authorised?"pending"===a.state.secondUser?r.a.createElement("div",{className:"spekt__login__pending"},"\u041d\u0430\u0440\u0438\u0441\u0443\u0439\u0442\u0435 \u0447\u0442\u043e-\u043d\u0438\u0431\u0443\u0434\u044c,",r.a.createElement("br",null),"\u043f\u043e\u043a\u0430 \u043c\u044b \u0436\u0434\u0435\u043c \u0432\u0442\u043e\u0440\u043e\u0433\u043e",r.a.createElement("br",null),"\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"):a.renderSpekt():a.renderLogin())))},a.state={ticket:"",authorised:"pending",userId:"",secondUser:"pending",buttonStatus:"never-pressed",message:"00:00",comment:r.a.createElement(r.a.Fragment,null,"\u041d\u0430\u0436\u043c\u0438\u0442\u0435 ",r.a.createElement("div",{className:"play-symbol"})," \u0447\u0442\u043e\u0431\u044b \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c",r.a.createElement("br",null),"\u0431\u0443\u0444\u0435\u0440\u0438\u0437\u0430\u0446\u0438\u044e")},a}return n}(a.Component);j.contextType=k;var O=function(e){var t=function(t){Object(i.a)(a,t);var n=Object(u.a)(a);function a(){return Object(c.a)(this,a),n.apply(this,arguments)}return Object(y.a)(a,[{key:"render",value:function(){var t=this.props,n=t.forwardRef,a=Object(E.a)(t,["forwardRef"]);return r.a.createElement(e,Object.assign({},a,{ref:n}))}}]),a}(a.Component),n=Object(d.f)(t,{withRef:!0});return r.a.forwardRef((function(e,t){return r.a.createElement(n,Object.assign({},e,{forwardRef:t}))}))}(j),S=n(68),T=n(32),C=n.n(T),R=n(13),D=n.n(R),I=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).loadData=Object(f.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,D()("http://localhost:3000/api/nottoscaleticket?limit=5000");case 3:return e.next=5,e.sent.json();case 5:e.t1=e.sent,e.t2={data:e.t1},e.t0.setState.call(e.t0,e.t2);case 8:case"end":return e.stop()}}),e)}))),a.deleteData=Object(f.a)(m.a.mark((function e(){var t,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.loadData();case 2:t=a.state.data,e.t0=m.a.keys(t);case 4:if((e.t1=e.t0()).done){e.next=19;break}return n=e.t1.value,e.t2=console,e.t3="destroyed ",e.t4=JSON,e.next=11,D()("http://localhost:3000/api/nottoscaleticket/destroy/"+t[n].id);case 11:return e.next=13,e.sent.json();case 13:e.t5=e.sent,e.t6=e.t4.stringify.call(e.t4,e.t5),e.t7=e.t3.concat.call(e.t3,e.t6),e.t2.log.call(e.t2,e.t7),e.next=4;break;case 19:case"end":return e.stop()}}),e)}))),a.addData=function(){var e=Object(f.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.deleteData();case 2:e.t0=m.a.keys(t);case 3:if((e.t1=e.t0()).done){e.next=14;break}return n=e.t1.value,e.t2=console,e.next=8,D()("http://localhost:3000/api/nottoscaleticket/create?"+(r={number:t[n][0]},Object.entries(r).map((function(e){return e.map(encodeURIComponent).join("=")})).join("&")));case 8:return e.next=10,e.sent.json();case 10:e.t3=e.sent,e.t2.log.call(e.t2,e.t3),e.next=3;break;case 14:return e.next=16,a.loadData();case 16:case"end":return e.stop()}var r}),e)})));return function(t){return e.apply(this,arguments)}}(),a.componentDidMount=function(){return a.loadData()},a.state={data:[],password:"",loggedIn:!0,file:void 0},a}return Object(y.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.password,a=t.loggedIn,o=t.data;return a?r.a.createElement("div",{className:"ZoomTicket"},r.a.createElement("div",{className:"container"},"\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 .CSV \u0444\u0430\u0439\u043b\u0430 (\u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u0443\u0434\u0443\u0442 \u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0438\u0441\u0430\u043d\u044b)",r.a.createElement(C.a,{onFileLoaded:function(t,n){return e.addData(t)}})),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"ZoomTicket__tickets"},r.a.createElement("h4",{className:"h4"},"\u0422\u0435\u043a\u0443\u0449\u0438\u0435 \u0431\u0438\u043b\u0435\u0442\u044b:"),o.map((function(e,t){return r.a.createElement("div",{key:e.id,className:"ZoomTicket__tickets__item"},r.a.createElement("div",{className:"ZoomTicket__tickets__item__index"},t+1,"."),r.a.createElement("div",{className:"ZoomTicket__tickets__item__ticketNumber"},e.number),r.a.createElement("div",{className:"ZoomTicket__tickets__item__zoomURL"},e.used?Object(S.a)(new Date(1e3*e.used),"dd/mm/yyyy"):"\u043d\u0435 \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d"))}))))):r.a.createElement("div",{className:"ZoomTicket"},r.a.createElement("div",{className:"container"},r.a.createElement(w,{value:n,onChange:function(t){return e.setState({password:t,loggedIn:"aNg2R4V5"===t})},placeholder:"\u043f\u0430\u0440\u043e\u043b\u044c"})))}}]),n}(r.a.Component);I.contextType=k;var F=I,B=n(33),L=n.n(B),U=n(34),P=n.n(U),A=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={},e.render=function(){return r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"footer__logo"},r.a.createElement(_,{newTab:!0,to:"https://tochkadostupa.spb.ru"},r.a.createElement("img",{className:"desktop-only",src:L.a}),r.a.createElement("img",{className:"mobile-only",src:P.a}))),r.a.createElement("div",{className:"footer__links"},r.a.createElement(_,{newTab:!0,to:"https://tochkadostupa.spb.ru/events/not_to_scale"},"\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0435"))))},e}return n}(a.Component),M=n(35),Z=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).componentDidMount=function(){a.resizeObserver=new M.a((function(){return a.resize()})).observe(a.canvasRef.current),a.resize()},a.resize=function(){var e=a.getCtx();e&&(e.canvas.width=a.canvasRef.current.clientWidth,e.canvas.height=a.canvasRef.current.clientHeight)},a.getCtx=function(){return a.canvasRef.current&&a.canvasRef.current.getContext("2d")},a.setPos=function(e){return a.pos={x:e.clientX,y:e.clientY}},a.setPosTouch=function(e){var t=e.changedTouches&&e.changedTouches[0];t&&(a.pos={x:t.pageX,y:t.pageY})},a.draw=function(e){var t=a.getCtx();t&&"undefined"!==typeof a.pos.x&&1===e.buttons&&(t.beginPath(),t.lineWidth=2.5,t.lineCap="round",t.strokeStyle="#ee0200",t.moveTo(a.pos.x,a.pos.y),a.setPos(e),t.lineTo(a.pos.x,a.pos.y),t.stroke())},a.drawTouch=function(e){var t=a.getCtx();t&&"undefined"!==typeof a.pos.x&&a.pressed&&(t.beginPath(),t.lineWidth=2.5,t.lineCap="round",t.strokeStyle="#ee0200",t.moveTo(a.pos.x,a.pos.y),a.setPosTouch(e),t.lineTo(a.pos.x,a.pos.y),t.stroke())},a.render=function(){return r.a.createElement("div",{className:"canvas"},r.a.createElement("canvas",{ref:a.canvasRef}))},a.pos={x:void 0,y:void 0},a.pressed=!1,a.canvasRef=r.a.createRef(),!function(){try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}}()?(document.addEventListener("mousemove",(function(e){return a.draw(e)})),document.addEventListener("mousedown",(function(e){return a.setPos(e)})),document.addEventListener("mouseenter",(function(e){return a.setPos(e)}))):(document.addEventListener("touchmove",(function(e){return a.drawTouch(e)})),document.addEventListener("touchstart",(function(e){a.pressed=!0,a.setPosTouch(e)})),document.addEventListener("touchend",(function(e){a.pressed=!1,a.setPosTouch(e)}))),a}return n}(a.Component),z=(n(65),function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var a,o;return Object(c.a)(this,n),(a=t.call(this,e)).render=function(){return r.a.createElement(l.a,null,r.a.createElement(k.Provider,{value:a.state},r.a.createElement(Z,null),r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"content"},r.a.createElement(d.c,null,r.a.createElement(d.a,{exact:!0,path:"/not-to-scale/"},r.a.createElement(O,null)),r.a.createElement(d.a,{path:"/not-to-scale/admin"},r.a.createElement(F,null)))),r.a.createElement(A,null))))},a.state=(o={state:a.state,setState:a.setState},{store:new b({stateRefs:o,DBlink:"http://localhost:3000/not-to-scale/api"})}),a}return n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.e3e74cbd.chunk.js.map