<template>
  <div
    class="r-tab-box"
    :style="{ width: width + '%',height: height + 'px' }"
  >
    <div
      id="whether-container"
      class="whether-container"
    >
      <MyWhether
        class="my-whether"
      ></MyWhether>
    </div>

    <div
      id="r-tab"
      class="r-tab"
    >
      <div class="tab-author">
        <div class="tab-author-img">
          <img
            v-lazy="record_default.img"
            alt=""
          >
        </div>
        <div class="tab-author-name">{{ record_default.title }}</div>
        <div class="tab-author-saying">{{ record_default.content }}</div>
      </div>
      <div class="tit-line-name">博客记录</div>
      <div class="tit-line"></div>
      <div class="time-line"></div>
      <div class="tit-line-active"></div>
      <div class="record">
        <ul class="record-msg">
          <li
            v-for="(item, index) in record_list"
            :key="index"
            class="record-msg-item"
          >
            <div class="record-time">{{ item.created_at }}</div>
            <div class="arrow"></div>
            <div class="shadow-hide"></div>
            <div class="record-shadow"></div>
            <div class="record-shadow-two"></div>
            <div class="record-content">{{ item.message }}</div>
            <div class="record-node"></div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { recordQuery, recordDefaultQuery } from '@/api/main/record'
export default {
  name: 'RightTab',
  props: {
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 500
    }
  },
  data() {
    return {
      record_list: [],
      record_default: {

      }
    }
  },
  mounted() {
    recordQuery({
      limit: 5,
      offset: 1
    }).then((res) => {
      for (let i = 0; i < res.data.rows.length; i++) {
        this.record_list.push(res.data.rows[i])
      }
    })
    var whether = document.querySelector('.whether-container')
    whether.addEventListener('mouseover', this.whetherhover, true)
    whether.addEventListener('mouseout', this.whetherout, true)
    this.init()
  },
  methods: {
    init() {
      recordDefaultQuery().then(res => {
        res.data[0].img = process.env.VUE_APP_BASE_API + res.data[0].img
        this.record_default = res.data[0]
      })
    },
    whetherhover() {
      var whether = document.getElementById('whether-container')
      var tab = document.getElementById('r-tab')
      whether.style.height = '58%'
      tab.style.top = 310 + 'px'
    },
    whetherout() {
      var whether = document.getElementById('whether-container')
      var tab = document.getElementById('r-tab')
      whether.style.height = '30%'
      tab.style.top = 170 + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (max-width:500px) {
  .r-tab-box{
  display: none;
}
}
.r-tab-box{
  position: absolute;
}
.title-line {
  margin-top: 20px;
  margin-left: 12px;
  margin-bottom: 10px;
}
.tit-line-active {
  width: 30px;
  height: 5px;
  background: #28a2e5;
  position: absolute;
  left: 5%;
  margin-top: -3px;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgb(96, 168, 255);
}
.r-tab:hover .tit-line-active {
  width: 65px;
  transition: 400ms;
}
.tab-author {
  width: 100%;
  height: 80px;
  position: relative;
}
.tab-author-img {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  position: absolute;
  overflow: hidden;
  left: 10px;
  & img{
    width: 100%;
    height: 100%;
  }
}
.tab-author-name {
  width: 150px;
  height: 24px;
  position: absolute;
  left: 100px;
  top: 10px;
  font-weight: 600;
  color: rgb(84, 84, 84);
  font-size: 20px;
  font-family: YouYuan;
}
.tab-author-saying {
  width: 160px;
  height: 60px;
  text-align: left;
  position: absolute;
  left: 100px;
  top: 45px;
  font-size: 12px;
  color: rgb(86, 84, 84);
}
.r-tab {
  border-radius: 4px;
  background: rgb(255, 255, 255,0.75);
  width: 100%;
  height: 500px;
  position: absolute;
  top: 170px;
  padding: 20px 0;
  transition: 500ms;
}
.tab-main {
  width: 100%;
  height: 100%;
}
.record {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 55px;
  position: absolute;
  height: 65%;
  overflow: scroll;
  overflow-x: hidden;
  top: 100px;
}
.record::-webkit-scrollbar {
  width: 8px;
}
.record::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.record::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
}
.record-msg {
  width: 90%;
  height: 90%;
  list-style: none;
  padding: 0;
  position: absolute;
  left: 38px;
}
.record-msg li {
  width: 155px;
  height: auto;
  min-height: 50px;
  border-radius: 4px;
  border: 1px solid #c0c7cf;
  background: #e0e6ed;
  z-index: 2;
  position: relative;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  margin-left: 20px;
  padding-bottom: 15px;
  padding-right: 10px;
  margin-top: 15px;
  margin-bottom: 30px;
}
.record-msg li:nth-child(1){
    margin-top: 0;
}
.arrow {
  width: 9px;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  left: -5px;
  border: 1px solid #b5beca;
  border-right: none;
  border-top: none;
  background: #e0e6ed;
  transform: rotate(47deg);
  top: 15px;
  font-size: 18px;
  height: 9px;
  border-radius: 26%;
  box-shadow: 0 0 0 3px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
}
.shadow-hide {
  width: 9px;
  height: 9px;
  position: absolute;
  background: #e0e6ed;
  top: 16px;
  z-index: 99;
}
.record-shadow {
  position: absolute;
  width: 94%;
  margin-left: 3%;
  height: 20px;
  background: -webkit-linear-gradient(top, white, #e0e6ed);
  border-radius: 10px;
  z-index: 100;
  content: "";
}
.record-shadow-two {
  position: absolute;
  bottom: 0;
  width: 94%;
  margin-left: 3%;
  height: 10px;
  filter: blur(1px);
  background: -webkit-linear-gradient(bottom, #f2f5f7, #e0e6ed);
  border-radius: 10px;
  z-index: 100;
  content: "";
}
.tit-line{
    width: 90%;
    margin-left: 5%;
    height: 1px;
    border-radius: 30px;
    background: #B9C3CD;
}
.tit-line-name{
  position: relative;
    font-size: 14px;
    font-family: YouYuan;
    font-weight: 600;
    color: rgb(126, 127, 128);
    margin: 15px;
    margin-left: 10px;
}
.record-content {
  width: 140px;
  margin-left: 22px;
  margin-top: 20px;
  text-align: left;
  text-shadow: 0 1px rgb(255 255 255 / 50%);
  color: #5d6b7d;
  font-size: 13px;
}
.time-line {
  width: 4px;
  border-radius: 2px;
  min-height: 350px;
  background: #b9c3cd;
  position: absolute;
  left: 32px;
  top: 165px;
}
.record-time {
  width: 120px;
  height: 24px;
  position: absolute;
  top: 0;
  left: 20px;
  font-size: 12px;
  color: #5d6b7d;
}
.record-msg-item:hover .record-time {
  transform: translateY(-25px);
  transition: 300ms;
}
.record-msg-item:hover {
  transform: translateY(22px);
  transition: 300ms;
}
.record-node {
  width: 9px;
  height: 9px;
  background: #a6b4c7;
  border-radius: 50%;
  position: absolute;
  left: -36px;
  top: 17px;
  box-shadow: 0 0 0 1px #cad1db inset, 0 0 0 2px #f0f2f7 inset;
}
.whether-container{
  width: 90%;
  padding: 0.5% 5%;
  height: 30%;
  position: absolute;
  right: 0px;
  top: 0px;
  border-radius: 4px;
  background: rgb(255, 255, 255,0.75);
  transition: 500ms;
  overflow: hidden;
}
</style>
