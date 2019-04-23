(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{570:function(e,t,a){},580:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(5),s=a(3),c=a(2),u=a(4),o=a(0),i=a.n(o),l=(a(570),a(244)),f=a(90),p=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this))).state={},a}return Object(u.a)(t,e),Object(n.a)(t,[{key:"componentWillMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return i.a.createElement("div",{className:"PersonalChat"},i.a.createElement(l.a,Object.assign({},this.props,{chatStore:f.a})))}}]),t}(o.Component);t.default=p},90:function(e,t,a){"use strict";var r=a(120),n=a(6),s=a.n(n),c=a(7),u=a(1),o=a(3),i=a(2),l=a(4),f=(a(66),a(38)),p=a(82),h=a(97),b=a(122),d=a(30),v=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(o.a)(this,Object(i.a)(t).call(this))).init=Object(c.a)(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getChatsMetas();case 2:e.chatMeta=t.sent,console.log(e.chatMeta),e.isReady=!0,e.emit("change");case 6:case"end":return t.stop()}},t)})),e.getChatMetaIds=Object(c.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",[]);case 1:case"end":return e.stop()}},e)})),e.getField=function(){var e=Object(c.a)(s.a.mark(function e(t,a){var r,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.b;case 2:return r=e.sent,e.next=5,r.database().ref("/chats/personal/".concat(t,"/").concat(a)).once("value");case 5:return n=e.sent,e.abrupt("return",n.val());case 7:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),e.getSingleChatMeta=function(){var t=Object(c.a)(s.a.mark(function t(a){var n,c,u,o,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.b;case 2:return t.next=4,Promise.all(["title","slug","isLeaf"].map(function(t){return e.getField(a,t)}));case 4:return n=t.sent,c=Object(r.a)(n,3),u=c[0],o=c[1],i=c[2],t.abrupt("return",new p.a(u,i,o,a));case 10:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.getChatMetaItem=function(t){console.log("getChatMetaItem",t);var a=d.a.user.uid,r=a>t?t:a,n=a>t?a:t;return e.trySetChatToUserData(t),{title:"",isLeaf:!1,slug:t,id:"".concat(r,"/").concat(n)}},e.getChatsMetas=Object(c.a)(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.b;case 2:return t.next=4,e.getChatMetaIds();case 4:return a=t.sent,t.next=7,Promise.all(a.map(e.getSingleChatMeta));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}},t)})),e.getChatSubjectsFlat=Object(c.a)(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getChatsMetas();case 2:return a=t.sent,t.abrupt("return",a.slice().sort(e.amountOfSlashesSort));case 4:case"end":return t.stop()}},t)})),e.getChatSubjects=Object(c.a)(s.a.mark(function t(){var a,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getChatSubjectsFlat();case 2:return a=t.sent,r=[],a.forEach(function(t){return e.nestChatSubject(t,r)}),t.abrupt("return",r);case 6:case"end":return t.stop()}},t)})),e.getChatThread=function(){var t=Object(c.a)(s.a.mark(function t(a){var r,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==a){t.next=2;break}throw new Error("Invalid chat meta");case 2:if(!e.threads[a.id]){t.next=4;break}return t.abrupt("return",e.threads[a.id]);case 4:return t.next=6,f.b;case 6:return r=t.sent,n=h.a.fromChatMeta(a,r.database().ref("/chats/personal/".concat(a.id,"/thread"))),e.threads[a.id]=n,t.abrupt("return",n);case 10:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.getAllPersonalChats=Object(c.a)(s.a.mark(function e(){var t,a,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.b;case 2:return t=e.sent,e.next=5,d.a.readyPromise;case 5:if(d.a.isAuthenticated){e.next=8;break}return e.abrupt("return",null);case 8:return e.next=10,t.database().ref("/users/".concat(d.a.user.uid,"/personalchatswithusers")).once("value");case 10:return a=e.sent,r=a.val()||{},e.abrupt("return",Object.keys(r).map(function(e){var t=r[e];return t.uid=e,t}).filter(function(e){return!0!==e.blocked}));case 13:case"end":return e.stop()}},e)})),e.trySetChatToUserData=function(){var e=Object(c.a)(s.a.mark(function e(t){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.b;case 2:return a=e.sent,e.next=5,d.a.readyPromise;case 5:if(d.a.isAuthenticated){e.next=8;break}return e.abrupt("return",!1);case 8:return e.next=10,a.database().ref("/users/".concat(d.a.user.uid,"/personalchatswithusers/").concat(t)).once("value");case 10:if(null!==e.sent.val()){e.next=20;break}return e.next=14,a.database().ref("/users/".concat(d.a.user.uid,"/personalchatswithusers/").concat(t)).set({blocked:!1});case 14:return e.next=16,a.database().ref("/users/".concat(t,"/personalchatswithusers/").concat(d.a.user.uid)).once("value");case 16:if(null!==e.sent.val()){e.next=20;break}return e.next=20,a.database().ref("/users/".concat(t,"/personalchatswithusers/").concat(d.a.user.uid)).set({blocked:!1});case 20:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),e.threads={},e.init(),setTimeout(Object(c.a)(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=console,t.next=3,e.getAllPersonalChats();case 3:t.t1=t.sent,t.t0.log.call(t.t0,t.t1);case 5:case"end":return t.stop()}},t)})),3e3),e}return Object(l.a)(t,e),t}(b.a);t.a=new v}}]);
//# sourceMappingURL=15.d55ff197.chunk.js.map