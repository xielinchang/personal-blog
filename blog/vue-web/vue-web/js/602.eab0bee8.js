"use strict";(self["webpackChunkvueforblog"]=self["webpackChunkvueforblog"]||[]).push([[602],{34602:function(t,s,a){a.r(s),a.d(s,{default:function(){return m}});var e=function(){var t=this,s=t._self._c;return s("div",[s("TemplatePage"),s("div",{staticClass:"main"},[s("div",{staticClass:"user"},[s("div",{staticClass:"portrait"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.prefix+t.userInfo.portrait,expression:"prefix+userInfo.portrait"}],attrs:{alt:""}}),s("my-upload",{attrs:{action:t.prefix+t.uploadUrl,image:t.image},on:{"upload-success":t.uploadCallback},model:{value:t.file,callback:function(s){t.file=s},expression:"file"}})],1),s("div",{staticClass:"user-r"},[s("div",{staticClass:"username user-r-item"},[t._v(" 账号："+t._s(t.userInfo.username))]),s("div",{staticClass:"name user-r-item"},[t.editFlag?s("div",[s("span",[t._v(" 名称："+t._s(t.userInfo.name))]),s("svg-icon",{attrs:{"icon-name":"edit"},on:{click:function(s){t.editFlag=!t.editFlag}}})],1):s("div",[s("my-input",{staticStyle:{float:"left","margin-right":"5px"},model:{value:t.userInfo.name,callback:function(s){t.$set(t.userInfo,"name",s)},expression:"userInfo.name"}}),s("my-button",{staticStyle:{float:"left","margin-right":"5px"},attrs:{type:"primary"},on:{click:function(s){t.editFlag=!t.editFlag}}},[t._v("取消修改")]),s("my-button",{attrs:{type:"success"},on:{click:t.updateName}},[t._v("确认修改")])],1)]),t.changePswFlag?s("div",{staticClass:"change-psw"},[s("my-input",{attrs:{label:"原密码",placeholder:"请输入原密码"},model:{value:t.changePswForm.old_pass,callback:function(s){t.$set(t.changePswForm,"old_pass",s)},expression:"changePswForm.old_pass"}}),s("my-input",{staticStyle:{"margin-top":"10px"},attrs:{label:"新密码",placeholder:"请输入6-20位的新密码"},model:{value:t.changePswForm.pass,callback:function(s){t.$set(t.changePswForm,"pass",s)},expression:"changePswForm.pass"}})],1):t._e(),s("div",{staticClass:"btns"},[t.changePswFlag?s("div",{staticStyle:{display:"flex"}},[s("my-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:function(s){t.changePswFlag=!t.changePswFlag}}},[t._v("取消修改")]),s("my-button",{attrs:{type:"success"},on:{click:t.changePswCheck}},[t._v("确认修改")])],1):s("div",{staticStyle:{display:"flex"}},[s("my-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:t.changePswInit}},[t._v("修改密码")]),s("my-button",{attrs:{type:"danger"},on:{click:t.logout}},[t._v("退出登录")])],1)])])]),t.essay_list.length>0?s("span",{staticStyle:{"font-family":"YOUYUAN"}},[t._v("收藏：")]):t._e(),s("ul",t._l(t.essay_list,(function(a,e){return s("li",{key:e,staticClass:"essay-list-item"},[s("img",{staticClass:"control-item-img",attrs:{src:a.coverUrl},on:{click:function(s){return t.jumpToEssay(a)}}}),s("div",{staticClass:"control-item-right",on:{click:function(s){return t.jumpToEssay(a)}}},[s("div",{staticClass:"control-item-time"},[t._v(t._s(a.updated_at))]),s("div",{staticClass:"control-item-title",attrs:{"right-title":a.title}},[t._v(" "+t._s(a.title)+" ")]),s("div",{staticClass:"item-sub-title",attrs:{"right-title":a.subtitle}},[t._v(" "+t._s(a.subtitle)+" ")]),s("ul",{staticClass:"control-item-type"},t._l(t.essay_list[e].tags,(function(a,e){return s("li",{key:e},[t._v(" "+t._s(a)+" ")])})),0)])])})),0)])],1)},i=[],l=(a(57658),a(68828)),n=a(26128),r=(a(39253),a(24418)),o={name:"UserPage",data(){return{essay_list:[],editFlag:!0,portrait:"",file:{},image:"",userInfo:{},prefix:"http://116.62.179.162:7001",uploadUrl:"http://116.62.179.162:7001/api/file",changePswForm:{},changePswFlag:!1}},watch:{"$route.path":function(t,s){this.initEssayList()}},mounted(){this.initEssayList()},methods:{changePswInit(){this.changePswFlag=!0,this.changePswForm={old_pass:"",pass:""}},initEssayList(){(0,r.LP)("token")&&this.$store.dispatch("getUserInfo").then((t=>{var s=t;this.userInfo=s;var a=[];if(this.essay_list=[],null!==this.userInfo.user_detail){a=this.userInfo.user_detail.collect.split(",");for(let t=0;t<a.length;t++)(0,l.Yv)({limit:999,offset:1,query:{id:Number(a[t]),title:void 0,subtitle:void 0,domain:void 0}}).then((s=>{s&&(s.data.rows[0].tags=s.data.rows[0].tags.split(","),s.data.rows[0].coverUrl=this.prefix+s.data.rows[0].coverUrl),""!==a[t]&&this.essay_list.push(s.data.rows[0])}))}}))},uploadCallback(){},jumpToEssay(t){this.$router.push("/note/essay?id="+t.id)},changePswCheck(){""!==this.changePswForm.old_pass&&""!==this.changePswForm.pass&&this.changePswForm.pass.length>6?(0,n.K5)(this.changePswForm).then((t=>{this.$msg({type:"success",content:t.data.msg}),this.logout()})):this.$msg({content:"请按规定填写信息",type:"warning"})},logout(){(0,r.gy)("token"),"/"!==this.$route.path&&this.$router.replace("/"),location.reload()}}},c=o,u=a(1001),p=(0,u.Z)(c,e,i,!1,null,"1067d413",null),m=p.exports}}]);