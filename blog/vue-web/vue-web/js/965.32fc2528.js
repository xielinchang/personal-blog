"use strict";(self["webpackChunkvuefortrading"]=self["webpackChunkvuefortrading"]||[]).push([[965],{42965:function(t,e,r){r.r(e),r.d(e,{default:function(){return m}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"imgurl"}],attrs:{alt:""}}),e("div",{staticClass:"shadow"},[e("div",{staticClass:"main-conatiner"},[e("my-input",{staticClass:"input",attrs:{width:t.width,height:t.height,icon:"user",label:"账号：",placeholder:"请输入账号"},model:{value:t.ruleForm.username,callback:function(e){t.$set(t.ruleForm,"username",e)},expression:"ruleForm.username"}}),e("my-input",{staticClass:"input",attrs:{width:t.width,height:t.height,label:"密码：",icon:"lock",type:"password",placeholder:"请输入密码"},model:{value:t.ruleForm.password,callback:function(e){t.$set(t.ruleForm,"password",e)},expression:"ruleForm.password"}}),e("my-input",{staticClass:"input",attrs:{width:t.width,height:t.height,label:"名称：",icon:"user",placeholder:"请输入名称"},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}}),e("div",{staticClass:"btns"},[e("button",{staticClass:"login-btn",staticStyle:{"margin-right":"20px"},on:{click:t.register}},[t._v("注册")]),e("button",{staticClass:"register-btn",attrs:{plain:""},on:{click:t.turnToLogin}},[t._v("返回登录")])])],1)])])},n=[],a=(r(57658),r(26128)),i=r(77899),l={name:"LoginPage",components:{},data(){return{ruleForm:{username:"",password:"",name:"",portrait:""},imgurl:r(36857),width:250,height:40}},methods:{register(t){(0,i.Wu)().then((t=>{var e=Math.floor(Math.random()*t.data.length);this.ruleForm.portrait=t.data[e].url,this.ruleForm.username.length<6||this.ruleForm.username.length>12?(this.$msg({content:"账号长度应该在6位到12位之间",type:"warning"}),this.ruleForm.username=""):this.ruleForm.password.length<6||this.ruleForm.password.length>20?(this.$msg({content:"密码长度应该在6位到20位之间",type:"warning"}),this.ruleForm.password=""):this.ruleForm.name.length<1||this.ruleForm.name.length>10?(this.$msg({content:"名字长度应该在1位到10位之间",type:"warning"}),this.ruleForm.name=""):(0,a.z2)(this.ruleForm).then((t=>{t.data.success?(this.$msg({content:"注册成功",type:"success"}),this.$router.push("/login")):this.$msg({content:"账号已存在",type:"warning"})}))}))},turnToLogin(){this.$router.push("/login")}}},o=l,u=r(1001),h=(0,u.Z)(o,s,n,!1,null,null,null),m=h.exports},36857:function(t,e,r){t.exports=r.p+"img/动漫1.4e2ebddf.jpg"}}]);