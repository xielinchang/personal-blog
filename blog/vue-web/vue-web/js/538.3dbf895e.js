"use strict";(self["webpackChunkvueforblog"]=self["webpackChunkvueforblog"]||[]).push([[538],{71538:function(t,s,i){i.r(s),i.d(s,{default:function(){return u}});var a=function(){var t=this,s=t._self._c;return s("div",[s("my-loading",{attrs:{"load-show":t.loading}},[s("div",{staticClass:"note-main"},[s("TemplatePage"),s("div",{staticClass:"about-me"},[s("div",{staticClass:"person introduce block"},[s("div",{staticClass:"label"},[t._v("个人信息")]),s("div",{staticClass:"introduce-main"},[s("div",{staticClass:"user-msg"},[s("div",{staticClass:"my-qq"},[s("span",[t._v(" qq:     ")]),t._v(t._s(t.detail.qq)+" ")]),s("div",{staticClass:"my-email"},[s("span",[t._v(" 邮箱 : ")]),t._v(t._s(t.detail.email)+" ")]),s("div",{staticClass:"my-phone"},[s("span",[t._v(" 电话 : ")]),t._v(t._s(t.detail.phone)+" ")])])])]),s("div",{staticClass:"person techniques block"},[s("div",{staticClass:"label"},[t._v("技术栈")]),s("ul",{staticClass:"techniques-tags"},t._l(t.detail.techniques,(function(i){return s("li",{key:i},[t._v(" "+t._s(i)+" ")])})),0)]),s("div",{staticClass:"person web-intro block"},[s("div",{staticClass:"label"},[t._v("网站申明")]),s("div",{staticClass:"web-intro-main"},[t._v(" "+t._s(t.detail.web_declare)+" ")])]),s("div",{staticClass:"project block"},[s("div",{staticClass:"label"},[t._v("项目之旅")]),s("ul",{staticClass:"project-list"},t._l(t.projectList,(function(i){return s("li",{key:i.id,staticClass:"block"},[s("router-link",{staticStyle:{color:"#333"},attrs:{to:"/note/project?id="+i.id}},[s("div",{staticClass:"p-item"},[s("div",{staticClass:"cover"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.prefix+i.coverUrl,expression:"prefix + item.coverUrl"}],attrs:{alt:""}})]),s("div",{staticClass:"project-msg"},[s("div",{staticClass:"p-name"},[t._v(" "+t._s(i.title)+" ")]),s("div",{staticClass:"p-create"},[t._v(" "+t._s(i.created_at)+" ")])])])])],1)})),0)])])],1)])],1)},e=[],l=i(77736);function o(t){return(0,l.Z)({url:"/aboutme/detail/query",method:"post",data:t})}var n=i(46651),c=(i(26128),i(39253),{name:"NotePage",data(){return{detail:{},projectList:[],prefix:"http://116.62.179.162:7001",loading:!1}},mounted(){document.documentElement.scrollTop=0,this.initAboutme()},methods:{initAboutme(){o().then((t=>{t.data[0].techniques=t.data[0].techniques.split(","),this.detail={...t.data[0]},this.initProject()}))},initProject(){this.loading=!0,(0,n.wJ)({limit:999,offset:1,query:{id:void 0,html:void 0,name:void 0}}).then((t=>{this.loading=!1,this.projectList=t.data.rows}))}}}),r=c,d=i(1001),v=(0,d.Z)(r,a,e,!1,null,"79ba63a4",null),u=v.exports},46651:function(t,s,i){i.d(s,{wJ:function(){return e}});var a=i(77736);function e(t){return(0,a.Z)({url:"/project/query/state",method:"post",data:t})}}}]);