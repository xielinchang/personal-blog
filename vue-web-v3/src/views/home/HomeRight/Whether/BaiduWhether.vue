<template>
  <div id="whether-container" class="whether-container">
    <div v-if="isShow">
      <div class="baidu-whether">
        <ul class="location">
          <li>{{ location.province }}</li>
          <li>{{ location.city }}</li>
        </ul>
     <!-- <div class="whether-img">
          <j-icon :name="whetherIcon" size="50px">
          </j-icon>
        </div> 
      -->
        <div class="temperature">{{ now.temp }}</div>
        <div class="whether-text">{{ now.text }}</div>
        <ul class="whether-detail">
          <li><span>feels like:{{ now.feels_like }}</span></li>
          <li><span>wind dir:{{ now.wind_dir }}</span></li>
          <li><span>wind class:{{ now.wind_class }}</span></li>
        </ul>
      </div>
      <ul class="more-whether">
        <li v-for="(item, index) in forecasts" :key="index">
          <div class="more-whether-left">
            <div class="more-date"><span>{{ forecasts[index].date }}</span>&nbsp;</div>
            <div class="more-img">
              <j-icon :name="forecasts[index].img" alt="">
              </j-icon>
            </div>
            <div class="more-text">&nbsp;<span>{{ forecasts[index].text_day }}</span></div>
          </div>
          <span>
            <div class="more-whether-right">
              <div class="more-max">{{ forecasts[index].high }}℃</div>&nbsp;/&nbsp;
              <div class="more-min">{{ forecasts[index].low }}℃</div>
            </div>
          </span>
        </li>
      </ul>
    </div>
    <div v-else class="net-error">
      <span style="color: var(--text7);">{{ netError ? 'loading error' : 'loading' }}</span>
      <j-icon v-show="!netError" name="loading" style="color: var(--text7); font-size: 22px;"></j-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserIp } from '@/api/default/index'
import { baiduWhether, baiduLocation } from '@/api/baidu/baiduapi'

const district_id = ref('')
const location = ref(null)
const now = ref(null)
const forecasts = ref([])
const whetherIcon = ref('')
const ip = ref('')
const isShow = ref(false)
const netError = ref(false)

const whetherhover = () => {
  const whether = document.getElementById('whether-container')
  whether.style.height = '300px'
}

const whetherout = () => {
  const whether = document.getElementById('whether-container')
  whether.style.height = '150px'
}

const initWhether = () => {
  /* 避免本地ip */
  if (ip.value === '127.0.0.1') {
    ip.value = ''
  }
  setTimeout(() => {
    netError.value = true
  }, 3000)
  baiduLocation(String(ip.value)).then(res => {
    console.log(res)
    if (res && res.data && res.data.content && res.data.content.address_detail) {
      district_id.value = res.data.content.address_detail.adcode
      /* 有些ip只能查到省级，若没有市级信息就给一个默认的编码 */
      baiduWhether(res.data.content.address_detail.city ? district_id.value : '350100').then(res => {
        if (res && res.data && res.data.result) {
          location.value = res.data.result.location
          now.value = res.data.result.now
          if (now.value) {
            now.value.temp = now.value.temp + '℃'
            now.value.feels_like = now.value.feels_like + '℃'
            whetherIcon.value = now.value.text
          }
          if (res.data.result.forecasts) {
            for (let i = 0; i < res.data.result.forecasts.length; i++) {
              forecasts.value.push(res.data.result.forecasts[i])
              forecasts.value[i].img = res.data.result.forecasts[i].text_day
            }
          }
          isShow.value = true
          const whether = document.querySelector('.whether-container')
          if (isShow.value && whether) {
            whether.addEventListener('mouseover', whetherhover, true)
            whether.addEventListener('mouseout', whetherout, true)
          } else if (whether) {
            whether.removeEventListener('mouseover')
            whether.removeEventListener('mouseout')
          }
        }
      })
    }
  })
}

onMounted(() => {
  getUserIp().then(res => {
    ip.value = res.data.ip
    initWhether()
  })
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/index.scss';

.baidu-whether {
  width: 100%;
  height: 150px;
  padding: 0.5% 1%;
  box-sizing: border-box;
  position: relative;
}

.location {
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

.location li {
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text1);
}

.whether-img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50px;
  left: 10px;
}

.whether-img img {
  width: 100%;
  height: 100%;
}

.temperature {
  width: 100px;
  height: 50px;
  position: absolute;
  top: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 40px;
  font-weight: 600;
  color: var(--rainbow8);
}

.whether-text {
  width: 40px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 55px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  color: var(--rainbow5);
}

.whether-detail {
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  list-style: none;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  flex-wrap: nowrap;

  & li {
    width: 100%;
    margin: 0px;
    text-align: center;

    span {
      color: var(--text7);
    }
  }
}

.more-whether {
  margin-top: 10px;
  padding: 0 5%;
}

.more-whether li {
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 0;

  span {
    color: var(--text7);
  }
}

.more-whether-left {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: left;
}

.more-img {
  width: 15px;
  height: 15px;
}

.more-img img {
  width: 100%;
  height: 100%;
}

.more-whether-right {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
}

.net-error {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
</style>
