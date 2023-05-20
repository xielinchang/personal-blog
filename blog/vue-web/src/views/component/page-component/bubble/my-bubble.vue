<template>
  <div>
    <div
      v-for="(item,index) in bubble_list"
      :key="index"
      :style="{'width':item.size+'px',
               'height':item.size+'px',
               'animation':'decorateUp'+item.type+' '+item.time1+'s '+item.type+' '+item.time2+'s'+' linear infinite'}"
      :class="'bubble'+item.bubbletype"
      class="bubble"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'MyBuble',
  data () {
    return {
      bubble_list: []
    }
  },
  mounted () {
    for (let i = 0; i < 24; i++) {
      this.bubble_list.push({
        bubbletype: i,
        size: Math.random() * 130 + 50,
        type: i < 15 ? i : i - 14,
        time1: Math.random() * 5,
        time2: Math.random() * 3
      })
    }
  }
}
</script>
<style scoped lang="scss">
.bubble{
    transform: scale(0.2);
    border-radius: 50%;
    background-color: rgb(255, 255, 255,0);
    position: absolute;
    bottom: 0px;
}
.bubble1{
animation: decorateUp1 3s 0s linear infinite;
}
.bubble2{
animation: decorateUp2 2s 0s linear infinite;
}
.bubble3{
animation: decorateUp3 3s 2s linear infinite;
}
.bubble4{
animation: decorateUp4 4s 0s linear infinite;
}
.bubble5{
animation: decorateUp5 4s 0s linear infinite;
}
.bubble6{
animation: decorateUp6 3s 2s linear infinite;
}
.bubble7{
animation: decorateUp7 5s 4s linear infinite;
}
.bubble8{
animation: decorateUp13 3s 1s linear infinite;
}
.bubble9{
animation: decorateUp9 3s 2s linear infinite;
}
.bubble10{
animation: decorateUp10 4s 1s linear infinite;
}
.bubble11{
animation: decorateUp11 3s 1.5s linear infinite;
}
.bubble12{
animation: decorateUp12 3s 2.5s linear infinite;
}
.bubble13{
animation: decorateUp12 2.5s 1s linear infinite;
}
.bubble14{
animation: decorateUp10 4s 2s linear infinite;
}
.bubble15{
animation: decorateUp11 5s 1s linear infinite;
}
.bubble16{
animation: decorateUp14 4s 0s linear infinite;
}
.bubble17{
animation: decorateUp8 3s 4s linear infinite;
}
.bubble18{
animation: decorateUp13 3s 0s linear infinite;
}
.bubble19{
animation: decorateUp11 3s 4s linear infinite;
}
.bubble20{
animation: decorateUp13 3s 0s linear infinite;
}
.bubble21{
animation: decorateUp12 4s 2s linear infinite;
}
.bubble22{
animation: decorateUp3 2s 1s linear infinite;
}
.bubble23{
animation: decorateUp11 3s 0.5s linear infinite;
}
.bubble24{
animation: decorateUp14 4s 1s linear infinite;
}
@keyframes decorateUp1 {
    0%{
        left: 10px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    30%{
        left: 0px;
        bottom:120px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    60%{
        left: 0px;
        bottom:250px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 20px;
        bottom: 350px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp2 {
    0%{
        left: 20px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 10px;
        bottom:100px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 30px;
        bottom: 200px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp3 {
    0%{
        left: -20px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 30px;
        bottom:50px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: -10px;
        bottom: 120px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp4 {
    0%{
        left: 200px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 170px;
        bottom:150px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 250px;
        bottom: 380px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp5 {
    0%{
        left: 300px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 330px;
        bottom:100px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 260px;
        bottom: 200px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp6 {
    0%{
        left: 350px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    20%{
        left: 330px;
        bottom:100px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    50%{
        left: 380px;
        bottom:200px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 330px;
        bottom: 350px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp7 {
    0%{
        left: 420px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 450px;
        bottom:100px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 440px;
        bottom: 200px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp8 {
    0%{
        left: 450px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 400px;
        bottom:100px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 460px;
        bottom: 160px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp8 {
    0%{
        left: 400px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    30%{
        left: 410px;
        bottom:80px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    70%{
        left: 360px;
        bottom:180px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 390px;
        bottom: 220px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp9 {
    0%{
        left: 550px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 600px;
        bottom:50px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 530px;
        bottom: 100px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp10 {
    0%{
        left: 600px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 660px;
        bottom:90px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 620px;
        bottom: 200px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp11 {
    0%{
        left: 800px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 810px;
        bottom:110px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 780px;
        bottom: 230px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp12 {
    0%{
        left: 1120px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 1150px;
        bottom:110px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 1130px;
        bottom: 230px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp13 {
    0%{
        left: 1280px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 1300px;
        bottom:60px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 1290px;
        bottom: 130px;
        background-color: rgb(196, 196, 196,0);
    }
}
@keyframes decorateUp14 {
    0%{
        left: 1180px;
        bottom: 0px;
        background-color: rgba(255, 255, 255, 0.836);
    }
    50%{
        left: 1200px;
        bottom:80px;
        background-color: rgba(248, 248, 248, 0.5);
    }
    100% {
        left: 1180px;
        bottom: 200px;
        background-color: rgb(196, 196, 196,0);
    }
}
</style>
