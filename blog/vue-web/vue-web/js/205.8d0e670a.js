"use strict";(self["webpackChunkvueforblog"]=self["webpackChunkvueforblog"]||[]).push([[205],{53205:function(e,s,t){t.r(s),t.d(s,{default:function(){return d}});var a=function(){var e=this,s=e._self._c;return s("div",[s("TemplatePage"),s("my-loading",{attrs:{"load-show":e.loading,"fixed-top":"400"}},[s("div",{staticClass:"message-container animated animate__fadeInUp"},[s("div",{staticClass:"all-message"},[e.message_list.length>0?s("ul",{staticClass:"message-list"},[e._l(e.message_list,(function(t,a){return s("li",{key:a},[s("div",{staticClass:"c-portrait"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.prefix+t.users[0].portrait,expression:"prefix + item.users[0].portrait"}],attrs:{alt:""}})]),s("div",{staticClass:"c-name"},[s("span",[e._v(" "+e._s(t.users[0].name))]),e._v("  "),s("span",[e._v(e._s(t.address))])]),s("div",{staticClass:"c-create-time"},[e._v(e._s(t.created_at))]),s("div",{staticClass:"c-message"},[e._v(e._s(t.content))]),null!==t.message_reply?s("div",{staticClass:"reply-container"},[s("div",{staticClass:"author-name"},[s("div",{staticClass:"author-border"},[e._v("博主")])]),s("div",{staticClass:"author-update-time"},[e._v(" "+e._s(t.message_reply.updated_at)+" ")]),s("div",{staticClass:"author-message"},[e._v(e._s(t.message_reply.reply))])]):e._e()])})),s("div",{staticClass:"query-page-box"},[s("QueryPage",{staticClass:"message-page",attrs:{"current-page":e.currentPage,total:e.total,"page-size":e.pageSize,"page-count":e.pageCount,"size-options":e.sizeOptions},on:{"change-page-size":e.changeSize,"change-page":e.changePage}})],1)],2):s("div",{staticClass:"nothing"},[e._v("暂无留言")])]),s("div",{staticClass:"message-body"},[s("div",{staticClass:"message-main"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newmessage.content,expression:"newmessage.content"}],staticClass:"message-msg",attrs:{id:"input",placeholder:"说点什么~😃",rows:"5",maxlength:"200"},domProps:{value:e.newmessage.content},on:{click:function(s){return e.emojiPickerOff()},input:function(s){s.target.composing||e.$set(e.newmessage,"content",s.target.value)}}}),s("div",{staticClass:"emoji-btn",on:{click:e.emojiShow}},[e._v("Emoji😃")]),s("div",{staticClass:"message-publish-btn",on:{click:e.publishmessage}},[s("svg-icon",{staticClass:"publish-icon",attrs:{"icon-name":"publish",size:"24px",color:"#00B753"}}),s("span",[e._v("发布")])],1),s("VEmojiPicker",{directives:[{name:"show",rawName:"v-show",value:e.showDialog,expression:"showDialog"}],staticClass:"emoji-picker",on:{select:e.selectEmoji}})],1)])])])],1)},i=[],n=(t(57658),t(39253)),o=t(24418),l=t(77736);function r(e){return(0,l.Z)({url:"/message/query",method:"post",data:e})}function g(e){return(0,l.Z)({url:"/message/create",method:"post",data:e})}var c={name:"MyMessage",data(){return{newmessage:{user_id:"",content:"",address:""},message_list:[],showDialog:!1,text:"",authorPortrait:"",publishAgain:!0,currentPage:1,total:0,pageCount:5,pageSize:5,ip:"",address:"中国",sizeOptions:[{label:"5条/页",value:5},{label:"10条/页",value:10},{label:"15条/页",value:15}],prefix:"http://1.94.31.132:7001",loading:!1}},mounted(){document.documentElement.scrollTop=0,this.initmessage(),this.initUser()},methods:{initUser(){(0,o.LP)("token")?n.Z.dispatch("getUserInfo").then((e=>{this.newmessage.user_id=e.id})):((0,o.gy)("token"),n.Z.commit("reSetUserInfo"))},initmessage(){this.message_list=[],this.loading=!0,r({limit:this.pageSize,offset:this.currentPage}).then((e=>{this.loading=!1,this.total=e.data.count,this.message_list=e.data.rows}))},selectEmoji(e){const s=document.getElementById("input"),t=s.selectionStart,a=s.selectionEnd,i=s.value.substring(0,t)+e.data+s.value.substring(a);s.value=i,setTimeout((function(){s.focus()}),200),s.selectionStart=t+e.data.length,s.selectionEnd=a+e.data.length,this.newmessage.content=i},emojiShow(){this.showDialog=!this.showDialog;const e=document.getElementById("input");e.value=e.value.substring(0,e.length)},reset(){var e=this;this.newmessage.content="",this.publishAgain=!1,this.changePage(1),this.showDialog=!1,setTimeout((function(){e.publishAgain=!0}),5e3)},publishmessage(){console.log(this.newmessage),this.newmessage.address=localStorage.getItem("address"),(0,o.LP)("token")?(""!==this.newmessage.content&&!0===this.publishAgain?g(this.newmessage).then((e=>{this.initmessage(),this.reset()})):""===this.newmessage.content?this.$msg({content:"不能发送空的消息",type:"info"}):this.$msg({content:"讲话太快了",type:"info"}),document.documentElement.scrollTop=0):(this.$router.push("/login"),this.$msg({type:"warning",content:"请先登录!"}))},changePage(e){this.currentPage=e,this.initmessage()},changeSize(e){this.pageSize=e},emojiPickerOff(){this.showDialog=!1}}},m=c,u=t(1001),h=(0,u.Z)(m,a,i,!1,null,"2bdf21ae",null),d=h.exports}}]);