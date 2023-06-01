"use strict";(self["webpackChunkvuefortrading"]=self["webpackChunkvuefortrading"]||[]).push([[832],{12832:function(t,s,e){e.r(s),e.d(s,{default:function(){return y}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"body"},[s("TemplatePage"),s("my-loading",{attrs:{"load-show":t.loading}}),s("div",{staticClass:"main-body"},[s("div",{staticClass:"main-container"},[s("div",{staticClass:"banner"},[s("div",{staticClass:"baner-mark"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.essayForm.coverUrl,expression:"essayForm.coverUrl"}],staticClass:"mark"}),s("div",{staticClass:"shadow-mark"}),s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.essayForm.coverUrl,expression:"essayForm.coverUrl"}],staticClass:"banner-img"})]),s("MyBuble",{staticClass:"buble"}),s("div",{staticClass:"banner-tit-box"},[s("div",{staticClass:"banner-title"},[t._v(t._s(t.essayForm.title))]),s("div",{staticClass:"banner-line"}),s("div",{staticClass:"banner-subtitle"},[t._v(t._s(t.essayForm.subtitle))])])],1),s("div",{staticClass:"catalog-box block",style:t.justStyle},[s("p",[t._v("目录:")]),s("ul",{directives:[{name:"show",rawName:"v-show",value:t.catalog.length>0&&t.catalogShow,expression:"catalog.length>0&&catalogShow"}],staticClass:"catalog"},t._l(t.catalog,(function(e,i){return s("li",{key:i,on:{click:function(s){return t.jumpToCatalog(e)}}},[t._v(t._s(e.key))])})),0)]),s("div",{staticClass:"main-page",style:{width:t.catalog.length>0&&t.catalogShow?"78%":"100%"}},[""!==t.essayForm.digest?s("div",{staticClass:"digest block"},[s("div",{staticClass:"digest-content"},[s("div",{staticClass:"digest-head"},[s("svg-icon",{staticClass:"digest-icon",attrs:{color:"#1DA9E0",size:"20px","icon-name":"digest","right-title":"摘要"}}),s("p",[t._v("简要的摘要能帮助读者更好的理解文章")])],1),t._v(" "+t._s(t.essayForm.digest)+" ")])]):t._e(),s("div",{staticClass:"essay"},[s("div",{staticClass:"essay-content",domProps:{innerHTML:t._s(t.essayForm.html)}}),s("div",{staticClass:"operation block"},[s("div",{staticClass:"good-icon",on:{click:t.addGood}},[t.isGood?s("svg-icon",{attrs:{"icon-name":"good-filled",size:"20px",color:"#ffa109"}}):s("svg-icon",{attrs:{"icon-name":"good",size:"20px",color:"#666"}}),t._v(" "+t._s(t.essayData.good)+" ")],1),s("div",{staticClass:"collect-icon",on:{click:t.addCollect}},[!0===t.isCollect?s("svg-icon",{attrs:{"icon-name":"collect-filled",size:"20px",color:"#ffa109"}}):s("svg-icon",{attrs:{color:"#666","icon-name":"collect",size:"20px"}}),t._v(" "+t._s(t.essayData.collect)+" ")],1),s("div",{staticClass:"comment-icon",on:{click:function(s){t.publishShow=!t.publishShow}}},[s("svg-icon",{attrs:{color:"#666","icon-name":"comment",size:"20px"}}),t._v(" "+t._s(t.commentNum)+" ")],1)])]),s("div",{staticClass:"comment"},[s("div",{staticClass:"c-publish",class:t.publishShow?"":"c-publish-close"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.commentForm.message,expression:"commentForm.message"}],attrs:{id:"input",placeholder:"请输入评论，最多不超过200字",rows:"5",maxlength:"200"},domProps:{value:t.commentForm.message},on:{click:function(s){t.showDialog=!1},input:function(s){s.target.composing||t.$set(t.commentForm,"message",s.target.value)}}}),s("div",{staticClass:"emoji-btn",on:{click:t.emojiShow}},[t._v(" Emoji😃 ")]),s("div",{staticClass:"c-publish-btn",on:{click:t.publishComment}},[s("svg-icon",{staticClass:"publish-icon",attrs:{"icon-name":"publish",size:"24px",color:"#00B753"}}),s("span",[t._v("发布")])],1),s("VEmojiPicker",{directives:[{name:"show",rawName:"v-show",value:t.showDialog,expression:"showDialog"}],staticClass:"emoji-picker",on:{select:t.selectEmoji}})],1),t.commentList.length>0?s("ul",{staticClass:"comment-list block"},t._l(t.commentList,(function(e,i){return s("li",{key:i},[s("div",{staticClass:"c-portrait"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.portrait,expression:"item.portrait"}],attrs:{alt:""}})]),s("div",{staticClass:"c-right"},[s("div",{staticClass:"c-top"},[s("div",{staticClass:"c-name"},[t._v(t._s(e.name))]),s("div",{staticClass:"c-address"},[t._v(t._s(e.address))])]),s("div",{staticClass:"c-publish-time"},[t._v(t._s(e.created_at))]),s("div",{staticClass:"c-msg"},[t._v(" "+t._s(e.message)+" ")])])])})),0):s("div",{staticClass:"no-comments"},[t._v(" 暂 无 评 论 ")])])])])]),s("div",{staticClass:"icon-buttons"},[s("icon-button",{staticClass:"icon-button",attrs:{icon:"comment-filled","left-title":"评论"},nativeOn:{click:function(s){return t.jumpToComment()}}}),s("icon-button",{directives:[{name:"show",rawName:"v-show",value:t.catalog.length>0,expression:"catalog.length>0"}],staticClass:"icon-button",attrs:{icon:"hide-filled","left-title":t.catalogShow?"隐藏目录":"打开目录"},nativeOn:{click:function(s){t.catalogShow=!t.catalogShow}}}),s("icon-button",{staticClass:"icon-button",attrs:{icon:"left","left-title":"上一篇"},nativeOn:{click:function(s){return t.preEssay()}}}),s("icon-button",{staticClass:"icon-button",attrs:{icon:"right","left-title":"下一篇"},nativeOn:{click:function(s){return t.nextEssay()}}})],1)],1)},o=[],a=(e(57658),e(22143)),n=e(26128),l=e(68828),c=e(1984);function r(t){return(0,c.Z)({url:"/essay/comments/query",method:"post",data:t})}function d(t){return(0,c.Z)({url:"/essay/comments/create",method:"post",data:t})}var h=e(24418),m={name:"EssayPage",data(){return{essayForm:{essay_id:null,coverUrl:"",title:"",subtitle:"",digest:"",html:""},commentForm:{user_id:"",essay_id:"",message:"",portrait:"",name:"",address:""},isGood:!1,isCollect:!1,essayData:{id:null,essay_id:null,good:0,collect:0},essay_id:"",commentNum:0,publishShow:!1,showDialog:!1,commentList:[],userDetail:{},collectIds:[],goodIds:[],loading:!1,catalog:[],scrollHeight:"",catalogShow:!0,prefix:"http://116.62.179.162:7001"}},computed:{justStyle(){return this.scrollHeight>470?{position:"fixed",top:"80px",right:"10%",width:"16.4%"}:{position:"absolute",top:"450px",right:0}}},watch:{"$route.query":{handler(t,s){this.init()},deep:!0}},created(){document.documentElement.scrollTop=0,window.addEventListener("scroll",this.onScroll),this.init()},methods:{init(){this.initPage(),this.initUser(),this.initEssay(),this.initComments(),this.initCatalog()},onScroll(){var t=document.documentElement.scrollTop||document.body.scrollTop;this.scrollHeight=t},changeEssay(t){(0,l.Yv)({limit:999,offset:1,query:{id:void 0,title:void 0,subtitle:void 0,domain:void 0}}).then((s=>{const e=s.data.rows,i=e.findIndex((t=>1*t.id===1*this.commentForm.essay_id));1*i===e.length-1&&"next"===t?this.$msg({content:"已经是最后一篇了",type:"info"}):1*i===0&&"pre"===t?this.$msg({content:"已经是第一篇了",type:"info"}):"next"===t?this.$router.push("/note/essay?id="+e[i+1].id):"pre"===t&&this.$router.push("/note/essay?id="+e[i-1].id)}))},preEssay(){this.changeEssay("pre")},nextEssay(){this.changeEssay("next")},selectEmoji(t){const s=document.getElementById("input"),e=s.selectionStart,i=s.selectionEnd,o=s.value.substring(0,e)+t.data+s.value.substring(i);s.value=o,setTimeout((function(){s.focus()}),200),s.selectionStart=e+t.data.length,s.selectionEnd=i+t.data.length,this.commentForm.message=o},emojiShow(){this.showDialog=!this.showDialog;const t=document.getElementById("input");t.value=t.value.substring(0,t.length)},emojiPickerOff(){this.showDialog=!1},initPage(){this.essayData.essay_id=1*this.$route.query.id,this.essay_id=1*this.$route.query.id},initCatalog(){this.catalog=[];var t=document.querySelectorAll("h1, h2, h3, h4, h5, h6, h7");for(let s=0;s<t.length;s++){const e=t[s];this.catalog.push({key:e.innerText,offset:e.offsetTop})}},jumpToCatalog(t){const s=setInterval((function(){const e=document.documentElement.scrollTop,i=35;e<=t.offset+300?(document.documentElement.scrollTop=e+i,1*e>=t.offset+400&&clearInterval(s)):(document.documentElement.scrollTop=e-i,1*e<=t.offset+400&&clearInterval(s))}),1)},initEssay(){var t=this;this.loading=!0,(0,l.Yv)({limit:1,offset:1,query:{id:1*this.essayData.essay_id,title:void 0,subtitle:void 0,domain:void 0}}).then((s=>{s.data.rows[0].essay_detail?t.essayData=s.data.rows[0].essay_detail:t.essayData={id:null,essay_id:null,good:0,collect:0},s.data.rows[0].coverUrl="http://116.62.179.162:7001"+s.data.rows[0].coverUrl,t.essayForm=s.data.rows[0],setTimeout((()=>{t.initCatalog()})),this.loading=!1}))},initComments(){r({limit:999,offset:1,query:{essay_id:this.essayData.essay_id}}).then((t=>{this.commentNum=t.data.count,t.data.rows.forEach((t=>{(0,n.tM)({id:t.user_id}).then((s=>{Object.assign(t,{portrait:this.prefix+s.data.user.rows[0].portrait,name:s.data.user.rows[0].name})}))})),this.commentList=t.data.rows}))},initUser(){this.initPage(),(0,h.LP)("token")?a.Z.dispatch("getUserInfo").then((t=>{null!==t.user_detail?(this.userDetail={...t.user_detail},this.userDetail.collect?this.collectIds=this.userDetail.collect.split(","):this.collectIds=[],this.collectIds.length>0&&(this.isCollect=!1,this.collectIds.find(((t,s)=>{1*t===1*this.essayData.essay_id&&(this.isCollect=!0)}))),this.userDetail.good?this.goodIds=this.userDetail.good.split(","):this.goodIds=[],this.goodIds.length>0&&(this.isGood=!1,this.goodIds.find(((t,s)=>{1*t===this.essayData.essay_id&&(this.isGood=!0)})))):this.userDetail={id:null,user_id:t.id,collect:"",good:""},this.commentForm={...t,address:localStorage.getItem("address"),user_id:t.id,essay_id:1*this.$route.query.id},delete this.commentForm.id,console.log(this.commentForm)})):this.$msg({content:"请先登录",type:"info"})},publishComment(){(0,h.LP)("token")?(console.log(this.commentForm),d(this.commentForm).then((t=>{this.initComments(),this.commentForm.message=""}))):this.$msg({content:"请先登录",type:"warning"})},jumpToComment(){const t=document.getElementsByClassName("comment"),s=t[0].offsetTop;var e=this;(0,h.LP)("token")||this.$msg({content:"请先登录",type:"warning"});const i=setInterval((function(){const t=document.documentElement.scrollTop,o=80;t<=s+100?(document.documentElement.scrollTop=t+o,1*t>=s+200&&(clearInterval(i),e.publishShow=!0)):(document.documentElement.scrollTop=t-o,1*t<=s+200&&(clearInterval(i),e.publishShow=!0))}),1)},addCollect(){this.initPage(),(0,h.LP)("token")?(this.isCollect=!this.isCollect,this.isCollect?(this.essayData.collect++,this.collectIds.push(this.essayData.essay_id)):(this.essayData.collect--,this.collectIds.splice(this.collectIds.indexOf(String(this.essayData.essay_id)),1)),this.collectIds.length>1?this.userDetail.collect=this.collectIds.join(","):this.userDetail.collect=this.collectIds.join(""),(0,l.EI)(this.essayData).then((t=>{(0,n.f5)(this.userDetail).then((t=>{!0===this.isCollect?(this.$msg({content:"收藏成功，前往个人管理查看",type:"success"}),this.initEssay()):(this.$msg({content:"已取消收藏，前往个人管理查看",type:"info"}),this.initEssay())}))}))):this.$msg({content:"用户尚未登录",type:"warning"})},addGood(){this.initPage(),(0,h.LP)("token")?(this.isGood=!this.isGood,this.isGood?(this.essayData.good++,this.goodIds.push(this.essayData.essay_id)):(this.essayData.good--,this.goodIds.splice(this.goodIds.indexOf(String(this.essayData.essay_id)),1)),this.goodIds.length>1?this.userDetail.good=this.goodIds.join(","):this.userDetail.good=this.goodIds.join(""),(0,l.EI)(this.essayData).then((t=>{(0,n.f5)(this.userDetail).then((t=>{!0===this.isGood?(this.$msg({content:"点赞成功",type:"success"}),this.initEssay()):(this.$msg({content:"已取消点赞",type:"info"}),this.initEssay())}))}))):this.$msg({content:"用户尚未登录",type:"warning"})}}},u=m,g=e(1001),v=(0,g.Z)(u,i,o,!1,null,"f5b8ce0a",null),y=v.exports}}]);