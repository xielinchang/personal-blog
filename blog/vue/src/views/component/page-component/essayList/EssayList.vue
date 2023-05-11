<template>
  <div>
    <div
      class="essay-body"
      :style="{ width: width + '%' }"
    >
      <ul class="essay-list">
        <li
          v-for="(item, index) in essay_list"
          :key="index"
          class="essay-item"
          @click="jumpToEssay(item)"
        >
          <img
            class="item-main"
            :src="item.coverUrl"
          />
          <div
            class="item-bottom"
          >
            <div class="item-time">{{ item.updated_at }}</div>
            <div
              class="item-title"
            >{{ item.title }}</div>
            <ul class="item-type">
              <li
                v-for="(item, index) in essay_list[index].tags"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
        <div
          v-show="essay_list.length===0"
          class="nothing"
        >无数据匹配</div>
      </ul>
      <div
        v-show="essay_list.length>0"
        class="query-page-box"
      >
        <QueryPage
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
    </div>

  </div>

</template>

<script>
import { essayQuery } from '@/api/essayapi'
export default {
  name: 'EssayList',
  props: {
    width: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      essay_list: [],
      params: {},
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
      this.init()
    },
    '$route.params': function(to, from) {
      this.init()
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.params = this.$route.query
      this.initEssayList()
    },


    foreachEssay(item) {
      this.essay_list = []
      for (let i = 0; i < item.length; i++) {
        item[i].tags = item[i].tags.split(',')
        item[i].coverUrl =
            process.env.VUE_APP_BASE_API + item[i].coverUrl
        this.essay_list.push(item[i])
      }
    },
    initEssayList() {
      var params = this.params
      var _this = this
      var query = {
        id: undefined,
        domain: undefined,
        html: undefined,
        tags: undefined
      }
      Object.assign(query, params)
      essayQuery({
        limit: this.pageSize,
        offset: this.currentPage,
        query: query
      }).then(res => {
        console.log(res)
        this.total = res.data.count
        this.foreachEssay(res.data.rows)
      })
      // this.searchFlag = false
    },
    jumpToEssay(item) {
      if (this.$route.path === '/control/essay') {
        this.$router.push('/control/essay/writing?id=' + item.id)
      } else {
        this.$router.push('/note/essay?id=' + item.id)
      }
    },
    changePage(val) {
      this.currentPage = val
      this.initEssayList()
    },
    changeSize(val) {
      this.pageSize = val
    }
  }
}
</script>

<style scoped lang="scss">
@import "EssayList";
</style>

