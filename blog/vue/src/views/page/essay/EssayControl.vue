<template>
  <div class="essayControl">
    <user-page></user-page>
    <div
      class="essay-control"
    >
      <span v-if="essay_list.length>0">文章管理：</span>
      <ul>
        <li
          v-for="(item, index) in essay_list"
          :key="index"
        >
          <svg-icon
            class="close"
            icon-name="close"
            color="#1AAAE0"
            size="18px"
            @click="essayDelete(item)"
          />
          <img
            class="control-item-img"
            :src="item.coverUrl"
            @click="jumpToEssay(item)"
          />
          <div
            class="control-item-right"
            @click="jumpToEssay(item)"
          >
            <div class="control-item-time">{{ item.updated_at }}</div>
            <div
              class="control-item-title"
              :right-title="item.title"
            >
              {{ item.title }}
            </div>
            <div
              class="item-sub-title"
              :right-title="item.subtitle"
            >
              {{ item.subtitle }}
            </div>
            <ul class="control-item-type">
              <li
                v-for="(item, index) in essay_list[index].tags"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="add-essay-container">
            <div class="add-essay">
              <svg-icon
                class="add"
                icon-name="add"
                size="70px"
                color="#F1DA4E"
                :right-title="'添加一篇新文章'"
                @click="jumpToAddEssay()"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { essayQuery, essayDelete } from '@/api/essayapi'
import UserPage from '../../page/user/user.vue'
import 'animate.css'
export default {
  name: 'EssayControlPage',
  components: {
    UserPage
  },
  data() {
    return {
      essay_list: []
    }
  },
  created() {},
  mounted() {
    this.initEssay()
  },
  methods: {
    initEssay() {
      this.essay_list = []
      var _this = this
      essayQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then((res) => {
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[i].tags = res.data.rows[i].tags.split(',')
          res.data.rows[i].coverUrl =
            process.env.VUE_APP_BASE_API + res.data.rows[i].coverUrl
          this.essay_list.push(res.data.rows[i])
        }
      })
    },
    jumpToEssay(item) {
      this.$router.push('/control/essay/writing?id=' + item.id)
    },
    jumpToAddEssay() {
      this.$router.push('/control/essay/writing?id=' + undefined)
    },
    essayDelete(item) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + item.title + '的文章吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          essayDelete({ id: item.id }).then((res) => {
            console.log(res)
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
            this.initEssay()
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
  <style lang="scss" scoped>
@import './scss/EssayControl.scss'
</style>
