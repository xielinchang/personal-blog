<template>
  <div>
    <div class="write-title">
      {{ defaultName }}
      <ul class="control animated animate__flipInX">
        <li
          v-for="(item,index) in control_list"
          v-show="defaultName===item.name?false:true"
          :key="index"
        >
          <router-link :to="item.router">
            {{ item.name }}
          </router-link>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      control_list: [{
        name: '文章',
        id: 1,
        router: '/essay/control'
      }, {
        name: '随笔',
        id: 2,
        router: '/share/control'
      }, {
        name: '评论',
        id: 3,
        router: '/writing/comments'
      }, {
        name: '博客记录',
        id: 4,
        router: '/writing/record'
      }]
    }
  }
}
</script>

<style>
  .write-title{
    width: 100px;
    height: 30px;
    position: fixed;
    top: 100px;
    left: 150px;
    box-shadow: 0 0 5px 1px #aaa;
    background: rgba(255, 255, 255, 0.5);
    z-index: 999;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    font-weight: 600;
    /* font-family: STHupo; */
    font-family: YouYuan;
    /* font-family: STCaiyun; */
    color: rgb(154, 95, 0);
  }

  .control{
    margin: 0;
    padding: 0;
    width: 100px;
    height: auto;
    list-style: none;
    position: absolute;
    left: 0px;
    top: 30px;
    display: flex;
    flex-direction: column;
    display: none;
    overflow: hidden;
  }
  .write-title:hover .control{
    display: block;
  }
  .control li{
    text-align: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 0 1px 1px #aaa;
    background: rgba(255, 255, 255, 0.6);
  }
  .control li a{
    color: rgb(154, 95, 0);
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
  }
   .control li:hover{
     background: -webkit-linear-gradient(right, rgb(252,233,253,0.8), rgb(211, 242, 252,0.8));
   }
   .active{
    background: -webkit-linear-gradient(right, rgb(252,233,253,0.8), rgb(211, 242, 252,0.8));
   }
</style>
