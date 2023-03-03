<template>
  <div
    class="share-body new-block"
    :style="{'width':width+'%'}"
  >
    <ul class="share-list animated animate__flipInY">
      <li
        v-for="(item,index) in share_list"
        :key="index"
        class="share-item"
        @click="jumpToShare(item)"
      >
        <div
          class="img-box"
          :style="{'backgroundImage':`url(${item.url})`}"
        >
        </div>
        <div class="content">
          {{ item.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { shareQuery } from '@/api/shareapi'
export default {
  name: 'ShareList',
  props: { width: {
    type: String,
    default: null
  }},
  data () {
    return {
      share_list: []
    }
  },
  mounted () {
    this.wowInit()
    this.initShare()
  },
  methods: {
    wowInit() {
      this.$nextTick(() => {
        new this.$wow.WOW({ live: false }).init()
      })
    },
    initShare() {
      var _this = this
      shareQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined
        }
      }).then(res => {
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[i].url = process.env.VUE_APP_BASE_API + res.data.rows[i].url
          _this.share_list.push(res.data.rows[i])
        }
      })
    },
    jumpToShare(item) {
      if (this.$route.path === '/share/control') {
        this.$router.push('/writing/share?id=' + item.id)
      } else {
        this.$router.push('/note/share?id=' + item.id)
      }
    }
  }
}
</script>

<style>
.share-body {
  width: 98%;
  margin-left: 1%;
  height: auto;
  position: relative;
}
.new-block {
  border-radius: 20px;
}
.share-list{
  width: 80%;
  height: auto;
  margin: 0;
  margin-left: 10%;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.share-list li{
  width: 100%;
  height: 520px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 50px;
}
.img-box{
  width: 94%;
  margin-left: 3%;
  height: 70%;
  overflow: hidden;
  margin-top: 3%;
  border-radius: 12px;
  background-size: cover;
  background-position-y: center;
  background-position-x: center;
}
.content{
  width: 94%;
  margin-left: 3%;
  height: 18%;
  box-sizing: border-box;
  padding: 10px 20px;
  position: absolute;
  bottom: 4%;
  border-radius:0 12px 12px 0;
  border-left: 4px solid green;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    font-family: YouYuan;
  font-size: 20px;
  line-height: 40px;
  display:-webkit-box;
  -webkit-box-orient:vertical;/*设置方向*/
  -webkit-line-clamp:2;/*设置超过为省略号的行数*/
  overflow:hidden;
}
</style>

