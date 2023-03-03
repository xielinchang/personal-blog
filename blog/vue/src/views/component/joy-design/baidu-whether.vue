<template>
  <div>
    <div class="baidu-whether">
      <ul class="location">
        <li>{{ location.province }}</li>
        <li>{{ location.city }}</li>
      </ul>
      <div class="whether-img">
        <j-icon :name="weatherIcon.valueOf()"></j-icon>
      </div>
      <div class="temperature">{{ now.temp }}℃</div>
      <div class="whether-text">{{ now.text }}</div>
      <ul class="whether-detail">
        <span>体感温度:</span> <li>{{ now.feels_like }}℃</li>
        <span>风向:</span> <li>{{ now.wind_dir }}</li>
        <span>等级:</span> <li>{{ now.wind_class }}</li>
      </ul>
    </div>
    <ul class="more-whether">
      <li
        v-for="(item,index) in forecasts"
        :key="index"
      >
        <div class="more-whether-left">
          <div class="more-date">{{ forecasts[index].date }}&nbsp;</div>
          <div class="more-img">
            <img
              :src="forecasts[index].img"
              alt=""
            >
          </div>
          <div class="more-text">&nbsp;{{ forecasts[index].text_day }}</div>
        </div>
        <div class="more-whether-right">
          <div class="more-max">{{ forecasts[index].high }}℃</div>&nbsp;/&nbsp;
          <div class="more-min">{{ forecasts[index].low }}℃</div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="">
import { getUserIp } from '../../../api/api'
import { baiduWhether, baiduLocation } from '../../../api/baiduapi'
import jIcon from './components/icon'
import { ref } from 'vue';
const district_id=ref('')
const location=ref({})
const now=ref({})
const forecasts=ref([])
const ip=ref('')
const weatherIcon=ref('')
      /* 避免本地ip */
      if (ip === '127.0.0.1') {
        ip = ''
      }
      baiduLocation(String(ip)).then((res:any) => {
        _district_id = res.data.content.address_detail.adcode
        /* 有些ip只能查到省级，若没有市级信息就给一个默认的编码 */
        baiduWhether(res.data.content.address_detail.city ? _district_id : '350100').then((res:any) => {
          _location = res.data.result.location
          _now = res.data.result.now
          // _whetherImg = require('../../../assets/icon/天气/' + _now.text + '.png')
          for (let i = 0; i < res.data.result.forecasts.length; i++) {
            _forecasts.push(res.data.result.forecasts[i])
            // _forecasts[i].img = require('../../../assets/icon/天气/' + res.data.result.forecasts[i].text_day + '.png')
          }
        })
      })
</script>

<style>
.baidu-whether{
    width: 100%;
    height: 150px;
    position: relative;
}
.location{
    width: 85%;
    height: 40px;
    position: absolute;
    display: flex;
    justify-content: left;
    list-style: none;
    overflow: hidden;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    line-height: 40px;
    padding: 0;
}
.location li{
    margin-right: 10px;
    font-size: 18px;
    font-weight: 600;
}
.whether-img{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50px;
    left: 10px;
}
.whether-img img{
    width: 100%;
    height: 100%;
}
.temperature{
    width: 100px;
    height: 50px;
    position: absolute;
    left: 65px;
    top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 40px;
    font-weight: 600;
    color: rgb(250, 113, 131);
}
.whether-text{
    width: 40px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 55px;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    color: rgb(121, 175, 255);
}
.whether-detail{
    width: 100%;
    height: 30px;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0px;
    list-style: none;
    line-height: 30px;
    display: flex;
    justify-content: left;
    font-size: 12px;
}
.whether-detail li{
    margin-right: 10px;
}
.whether-more{
width: 25px;
height: 25px;
position: absolute;
right: 5px;
top: 5px;
}
.whether-more img{
    width: 100%;
    height: 100%;
}
.more-whether{
    width: 100%;
    height: 130px;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
}
.more-whether li{
    width: 100%;
    height: 25px;
    margin-bottom: 5px;
    display: flex;
    justify-content: left;
    font-size: 12px;
}
.more-whether-left{
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: left;
}
.more-img{
    width: 15px;
    height: 15px;
}
.more-img img{
    width: 100%;
    height: 100%;
}
.more-whether-right{
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: right;
}
</style>
