"use strict";(self["webpackChunkvueforblog"]=self["webpackChunkvueforblog"]||[]).push([[379],{91379:function(t,e,s){s.r(e),s.d(e,{default:function(){return d}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"imgurl"}],attrs:{alt:""}}),e("div",{staticClass:"shadow"},[e("div",{staticClass:"main-conatiner",staticStyle:{height:"250px"}},[e("my-input",{staticClass:"input",staticStyle:{"padding-bottom":"20px"},attrs:{width:t.width,height:t.height,type:"text",icon:"user",label:"账号：",placeholder:"请输入账号"},model:{value:t.ruleForm.username,callback:function(e){t.$set(t.ruleForm,"username",e)},expression:"ruleForm.username"}}),e("my-input",{staticClass:"input",attrs:{width:t.width,height:t.height,icon:"lock",label:"密码：",placeholder:"请输入密码",type:"password"},model:{value:t.ruleForm.password,callback:function(e){t.$set(t.ruleForm,"password",e)},expression:"ruleForm.password"}}),e("div",{staticClass:"btns"},[e("button",{staticClass:"login-btn",on:{click:t.login}},[t._v("登 录")]),e("button",{staticClass:"register-btn",attrs:{plain:"",type:"info"},on:{click:t.turnToRegister}},[t._v("去注册")])])],1)])])},i=[],r=(s(57658),s(26128)),o=s(24418),n={name:"LoginPage",components:{},data(){return{ruleForm:{username:"",password:""},imgurl:s(36857),width:250,height:40}},methods:{login(){(0,r.x4)(this.ruleForm).then((t=>{console.log(t),!0===t.data.data.success?((0,o.o4)("token",t.data.data.token),this.$msg({content:"登录成功",type:"success"}),this.$router.go(-1),location.reload()):this.$msg({content:"登录失败！账号或者密码有误！！",type:"danger"})}))},turnToRegister(){this.$router.push("/register")}}},l=n,u=s(1001),c=(0,u.Z)(l,a,i,!1,null,"29529790",null),d=c.exports},36857:function(t,e,s){t.exports=s.p+"img/动漫1.4e2ebddf.jpg"}}]);