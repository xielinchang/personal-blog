<template>
  <div>
    <div class="share">
      <TemplatePage class="share-template"></TemplatePage>
      <div class="back-home">
        <svg-icon
          icon-name="back"
          size="40px"
          color="#F39800"
          data-title="返回主页"
          @click="backHome()"
        />
      </div>
      <div class="share-main">
        <div
          class="share-banner"
          :style="{'backgroundImage':`url(${share.url})`}"
        >
          <div class="share-icon">
            <div class="share-date">
              <div class="share-date-icon"></div>
              <span>{{ share.created_at }}</span>
            </div>
            <div class="share-tag">
              <div class="share-tag-icon"></div>
              <span
                v-for="(item,index) in share.tags"
                :key="index"
              >{{ share.tags[index] }}</span>
            </div>
          </div>

        </div>
        <div class="share-content">
          <div
            class="share-content-main"
            v-html="share.html"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shareQuery } from '@/api/shareapi'
import 'animate.css'
export default {
  data () {
    return {
      share: {
        url: '',
        created_at: '',
        tags: [],
        html: ''
      }
    }
  },
  mounted () {
    document.documentElement.scrollTop = 0
    this.initShare()
  },
  methods: {
    initShare() {
      var _this = this
      var id = this.$route.query.id
      console.log(this.$route.query)
      shareQuery({
        limit: 1,
        offset: 1,
        query: {
          id: id,
          title: undefined
        }
      }).then(res => {
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[0].tags = res.data.rows[0].tags.split(',')
          res.data.rows[0].url = process.env.VUE_APP_BASE_API + res.data.rows[0].url
          this.share = res.data.rows[0]
        }
      })
    },
    backHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.share{
   width: 100%;
  min-height: calc(100vh);
  height: auto;
}
.share-template{
  width: 100%;
  height: calc(100vh);
  position: fixed;
  top: 0;
  left: 0;
}
  .share-main{
   width: 60%;
    min-height: 1200px;
    height: auto;
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    top: 100px;
    border-radius: 8px;
    background: rgb(255,255,255 ,0.6);
    box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
      0 13px 15px rgb(31 45 61 / 15%);
      padding-bottom: 20px;
  }
  .share-banner{
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    height: 480px;
    border-radius: 8px;
    background: rgb(255,255,255 ,0.6);
    box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    position: relative;
    overflow: hidden;
    background-size: cover;
  background-position-y: center;
  background-position-x: center;
  }
  .share-icon{
    top: 50%;
    transform: translate(0%,-50%);
    width: 60%;
    margin-left: 25%;
    height: 60px;
    position: relative;
    color: rgba(0, 174, 255, 0.8);
    font-weight: 600;
    font-size: 16px;
    opacity: 0.3;
  }
  .share-banner:hover .share-icon{
    transition: 800ms;
    opacity: 1;
  }
  .share-date,.share-tag{
    width: 50%;
    height: 100%;
    position: absolute;
  }
  .share-date{
    left: 0;
  }
  .share-tag{
    right: 0;
    display: flex;
  }
  .share-date-icon,.share-tag-icon{
    width: 35px;
    height: 35px;
    background-image: url('../../../assets/icon/日期.png');
    background-size:100%;
    position: absolute;
    left: 20px;
    top: 25%;
  }
  .share-tag-icon{
    right: 20px;

  }
  .share-date span{
    position: absolute;
    left: 60px;
    top: 20px;
  }
  .share-tag span{
    position: relative;
    margin-left: 10px;
    left: 60px;
    top: 20px;
  }
  .share-tag-icon{
    background-image: url('../../../assets/icon/biaoqian.png');
    top: 25%;
  }
  .share-content{
    width: 90%;
    margin-left: 5%;
    height: auto;
    margin-top: 40px;
    padding: 30px 0;
    border-radius: 8px;
    background: rgb(255,255,255 ,0.6);
    box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  }
.share-content-main{
  width: 90%;
  margin-left: 5%;
  height: 100%;
  font-family: YouYuan;
  font-weight: 500;
  font-size: 30px;
  word-spacing: 10px;
  letter-spacing: 5px;
  line-height: 50px;
}
.share-comments{
  margin-top: 100px;
  width: 79%;
  margin-left: 5%;
}
.back-home{
  width: 35px;
  height: 35px;
  overflow: hidden;
  position: fixed;
  top: 133px;
  left: 140px;
  border-radius: 12px;
  z-index: 9999;
}
.back-home img{
  width: 100%;
  height: 100%;
}
.back-home img:hover{
  transform: scale(1.1);
  transition: 300ms;
}
</style>
