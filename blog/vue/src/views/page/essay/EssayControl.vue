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
            >
              {{ item.title }}
            </div>
            <div
              class="item-sub-title"
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
                right-title="添加一篇新文章"
                @click="jumpToAddEssay()"
              />
            </div>
          </div>
        </li>
      </ul>
      <QueryPage
        style="margin-top: 20px;"
        class="query-page"
        :current-page="currentPage"
        :total="total"
        :is-one-show="false"
        :page-size="pageSize"
        :page-count="pageCount"
        :size-options="sizeOptions"
        @change-page-size="changeSize"
        @change-page="changePage"
      ></QueryPage>
    </div>
    <router-link to="/control/essay/writing?id=undefined">
      <icon-button
        icon="add"
        class="icon-button"
        left-title="添加新文章"
      ></icon-button>
    </router-link>
  </div>
</template>

<script>
import { essayQuery, essayDelete } from '@/api/main/essayapi'
import UserPage from '../../page/user/user.vue'
import 'animate.css'
export default {
  name: 'EssayControlPage',
  components: {
    UserPage
  },
  data() {
    return {
      essay_list: [],
      /* 当前页 */
      currentPage: 1,
      /* 总数 */
      total: 0,
      /* 需要显示多少个按钮，即在第几个按钮上加‘...’ */
      pageCount: 5,
      /* 每页的条目数 */
      pageSize: 8,
      sizeOptions: [
        { label: '8条/页', value: 8 },
        { label: '12条/页', value: 12 },
        { label: '16条/页', value: 16 }
      ]
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initEssay()
    }
  },
  created() {

  },
  mounted() {
    this.initEssay()
  },
  methods: {
    initEssay() {
      this.essay_list = []
      var _this = this
      essayQuery({
        limit: this.pageSize,
        offset: this.currentPage,
        query: {
          id: undefined,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then((res) => {
        this.total = res.data.count
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
    changePage(val) {
      this.currentPage = val
      this.initEssay()
    },
    changeSize(val) {
      this.pageSize = val
    },
    essayDelete(item) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + item.title + '的文章吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          essayDelete({ id: item.id }).then((res) => {
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
