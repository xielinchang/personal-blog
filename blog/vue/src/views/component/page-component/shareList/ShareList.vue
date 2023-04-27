<template>
  <div
    class="share-body new-block"
    :style="{'width':width+'%'}"
  >
    <ul class="share-list">
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
    this.initShare()
  },
  methods: {
    initShare() {
      var _this = this
      this.share_list = []
      shareQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined,
          tags: undefined
        }
      }).then(res => {
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[i].url = process.env.VUE_APP_BASE_API + res.data.rows[i].url
          _this.share_list.push(res.data.rows[i])
        }
      })
    },
    jumpToShare(item) {
      if (this.$route.path === '/control/share') {
        this.$router.push('/control/share/writing?id=' + item.id)
      } else {
        this.$router.push('/note/share?id=' + item.id)
      }
    }
  }
}
</script>

<style scoped>
.share-body {
  width: 98%;
  margin-left: 1%;
  height: auto;
  position: relative;
  display: inline-block;
  animation: flipInY;
  animation-duration: 0.8s;
}
.new-block {
  border-radius: 4px;
}
.share-list{
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255, 0.6);
}
.share-list li{
  width: 100%;
  height: 520px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 80px;
}
.img-box{
  width: 94%;
  margin-left: 3%;
  height: 70%;
  overflow: hidden;
  margin-top: 3%;
  border-radius: 4px;
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
  border-radius:0 4px 4px 0;
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

