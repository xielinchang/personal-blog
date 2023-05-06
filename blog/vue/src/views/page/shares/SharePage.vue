<template>
  <div>
    <div class="share">
      <TemplatePage class="share-template"></TemplatePage>
      <div class="share-main">
        <div
          class="share-banner"
          :style="{'backgroundImage':`url(${share.url})`}"
        >
          <div class="share-icon">
            <div class="share-date">
              <span class="share-date-icon">
                <svg-icon
                  icon-name="date"
                  size="24px"
                  color="#F5A7B2"
                ></svg-icon>
              </span>
              <span>{{ share.created_at }}</span>
            </div>
            <div class="share-tag">
              <span class="share-tag-icon">
                <svg-icon
                  icon-name="tag"
                  size="24px"
                  color="#00B753"
                ></svg-icon>
              </span>
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
      <div class="icon-buttons">
        <router-link :to="'/control/share/writing?id='+share_id">
          <icon-button
            v-if="identity==='管理员'"
            class="icon-button"
            icon="edit"
            left-title="编辑"
          ></icon-button>
        </router-link>
        <icon-button
          class="icon-button"
          icon="left"
          left-title="上一篇"
          @click.native="preShare()"
        ></icon-button>
        <icon-button
          class="icon-button"
          icon="right"
          left-title="下一篇"
          @click.native="nextShare()"
        ></icon-button>
      </div>

    </div>
  </div>
</template>

<script>
import { shareQuery } from '@/api/shareapi'
import { queryUser } from '@/api/user'
import 'animate.css'
export default {
  data () {
    return {
      share: {
        url: '',
        created_at: '',
        tags: [],
        html: ''
      },
      share_id: '',
      identity: null
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler(value, oldValue) {
        // 处理路由参数变化的逻辑
        this.initShare()
      }
    },
    '$route.query': {
      immediate: true,
      handler(value, oldValue) {
        this.initShare()
      },
      deep: true
    }

  },
  mounted () {
    document.documentElement.scrollTop = 0
    this.initShare()
    this.initUser()
  },
  methods: {
    initUser() {
      queryUser({ id: localStorage.getItem('userId') }).then(res => {
        this.identity = res.data.user.rows[0].identity
      })
    },
    changeShare(type) {
      shareQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined
        }
      }).then(res => {
        console.log(res)
        const arr = res.data.rows
        const idIndex = arr.findIndex(item => item.id * 1 === this.$route.query.id * 1)
        if (idIndex * 1 === arr.length - 1 && type === 'next') {
          this.$msg({
            content: '已经是最后一篇了',
            type: 'info'
          })
        } else if (idIndex * 1 === 0 && type === 'pre') {
          this.$msg({
            content: '已经是第一篇了',
            type: 'info'
          })
        } else {
          if (type === 'next') {
            this.$router.push('/note/share?id=' + arr[idIndex + 1].id)
          } else if (type === 'pre') {
            this.$router.push('/note/share?id=' + arr[idIndex - 1].id)
          }
        }
      })
    },
    preShare() {
      this.changeShare('pre')
    },
    nextShare() {
      this.changeShare('next')
    },
    initShare() {
      var _this = this
      this.share_id = this.$route.query.id
      var id = this.share_id
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
    }
  }
}
</script>
<style scoped lang="scss">
@import "./scss/SharePage";
</style>
