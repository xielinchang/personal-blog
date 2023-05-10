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
    <div
      v-show="searchFlag"
      class="search-box"
    >

      <div
        ref="searchBox"
        class="search-main"
      >
        <div
          class="search"
        >
          <my-select
            width="150"
            :right-title="'根据'+selected.label+'来搜索'"
            :options="essaySearchList"
            :selected="selected"
            @change-select="changeSelect"
          >
          </my-select>
          <my-select
            v-if="selected.value==='domain'"
            width="400"
            :options="domainOptions"
            :selected="domainSelected"
            @change-select="changeDomainSelect"
          >

          </my-select>
          <my-input
            v-else
            v-model="searchKey"
            placeholder="请输入您想搜索的关键字"
            height="38"
            width="400"
          ></my-input>
          <my-button
            plain
            style="height: 38px"
            icon="search"
            type="info"
            @keyup.enter="search"
            @click="search"
          >
            搜索
          </my-button>
        </div>

      </div>
      <div
        class="shadow"
        @click="offShadow"
      >
      </div>
    </div>
    <icon-button
      :left-title="hasSearch==0?'搜索':'取消'"
      :icon="hasSearch==0?'search-filled':'close'"
      @click.native="searchShow()"
    ></icon-button>
  </div>

</template>

<script>
import { essayQuery } from '@/api/essayapi'
import IconButton from '@/views/component/default-component/iconButton/iconButton.vue'
export default {
  name: 'EssayList',
  components: { IconButton },
  props: {
    width: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      essay_list: [],
      // 搜索的关键字
      searchKey: '',
      // 搜索框是否打开
      searchFlag: false,
      params: {},
      essaySearchList: [],
      domainOptions: [],
      selected: {
        label: '内容',
        value: 'html'
      },
      domainSelected: {
        label: 'HTML',
        value: 'html'
      },
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
  computed: {
    hasSearch() {
      return Object.keys(this.$route.query).length
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
  created () {
    this.domainOptions = this.$store.state.dictionary.domain
    this.essaySearchList = this.$store.state.dictionary.essaySearchList
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.params = this.$route.query
      this.initEssayList()
    },
    offShadow() {
      this.searchFlag = !this.searchFlag
    },
    searchShow() {
      if (Object.keys(this.$route.query).length > 0) {
        this.$router.push('/home')
      } else {
        this.searchFlag = true
      }
    },
    search() {
      /* 根据所选来进行搜索文章 */
      this.searchFlag = !this.searchFlag
      var selected = this.selected.value
      if (selected !== 'domain') {
        this.$router.push('/home?' + selected + '=' + this.searchKey)
      } else {
        this.$router.push('/home?' + selected + '=' + this.domainSelected.label)
      }
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
    changeSelect(label, value) {
      this.selected.label = label
      this.selected.value = value
    },
    changeDomainSelect(label, value) {
      this.domainSelected.label = label
      this.domainSelected.value = value
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
        this.total = res.data.count
        this.foreachEssay(res.data.rows)
      })
      this.searchFlag = false
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

