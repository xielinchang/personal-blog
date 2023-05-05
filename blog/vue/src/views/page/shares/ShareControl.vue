<template>
  <div class="shareControl">
    <TemplatePage class="write-template"></TemplatePage>
    <div class="share-control">
      <ul class="control-share-list">
        <li
          v-for="(item,index) in share_list"
          :key="index"
          class="control-share-item"
        >
          <svg-icon
            right-title="删除"
            icon-name="delete"
            color="#1AAAE0"
            class="share-delete"
            @click="shareDelete(item)"
          />
          <div class="control-share-img">
            <img
              width="100%"
              :src="item.url"
              alt=""
              @click="jumpToShare(item)"
            >
          </div>
          <div
            class="control-share-content"
            @click="jumpToShare(item)"
          >
            {{ item.title }}
          </div>
        </li>
        <li class="control-share-item">
          <div class="add-share">
            <svg-icon
              class="share-icon"
              icon-name="add"
              color="#F1DA4E"
              size="70px"
              right-title="添加一篇新分享"
              @click="jumpToAddShare()"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* import getToken from '../utils/author' */
import { shareQuery, shareDelete } from '@/api/shareapi'
import 'animate.css'
export default {
  name: 'ShareControlPage',
  data() {
    return {
      share_list: []
    }
  },
  mounted () {
    this.initShare()
  },
  created () {
  },
  methods: {
    initShare() {
      this.share_list = []
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
      this.$router.push('/control/share/writing?id=' + item.id)
    },
    jumpToAddShare() {
      this.$router.push('/control/share/writing?id=' + undefined)
    },
    shareDelete(item) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + item.title + '的随笔吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          shareDelete({ id: item.id }).then(res => {
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
          })
        },
        onCancel: () => {
          this.$msg({
            type: 'info',
            content: '已取消删除'
          })
        }
      })
    }
  }
}
</script>
    <style scoped lang="scss">
    @import "./scss/ShareControl";
  </style>

