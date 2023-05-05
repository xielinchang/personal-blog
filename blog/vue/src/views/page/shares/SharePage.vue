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
