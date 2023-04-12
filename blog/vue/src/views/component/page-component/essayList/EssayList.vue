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
            :options="options"
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
            height="38"
            width="400"
          ></my-input>
          <my-button
            plain
            style="height: 38px"
            icon="search"
            type="info"
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
    <div
      class="btn-item"
      left-title="搜索"
      @click="searchShow"
    >
      <svg-icon
        :icon-name="iconFlag?'search-filled':'close'"
        size="20px"
        color="#409EFF"
        class="btn-icon"
      ></svg-icon>
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
      searchKey: '',
      searchFlag: false,
      iconFlag: true,
      options: [{
        label: '标题',
        value: 'title'
      }, {
        label: '领域',
        value: 'domain'
      }, {
        label: '标签',
        value: 'tags'
      }],
      domainOptions: [{
        label: 'HTML',
        value: 'html'
      }, {
        label: 'CSS',
        value: 'css'
      }, {
        label: 'JS',
        value: 'js'
      }, {
        label: 'VUE',
        value: 'vue'
      }, {
        label: '其他',
        value: 'other'
      }],
      selected: {
        label: '标题',
        value: 'title'
      },
      domainSelected: {
        label: 'HTML',
        value: 'html'
      }
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initEssayList()
    }
  },
  mounted() {
    this.initEssayList()
  },
  methods: {
    offShadow() {
      this.iconFlag = true
      this.searchFlag = !this.searchFlag
    },
    searchShow() {
      if (this.iconFlag) {
        this.searchFlag = !this.searchFlag
        this.iconFlag = !this.iconFlag
      } else {
        this.iconFlag = !this.iconFlag
        this.initEssayList()
      }
    },
    search() {
      if (this.selected.value === 'title') {
        essayQuery({
          limit: 999,
          offset: 1,
          query: {
            id: undefined,
            title: this.searchKey ? this.searchKey : undefined,
            domain: undefined,
            tags: undefined
          }
        }).then(res => {
          this.foreachEssay(res.data.rows)
          this.searchFlag = !this.searchFlag
        })
      } else if (this.selected.value === 'domain') {
        essayQuery({
          limit: 999,
          offset: 1,
          query: {
            id: undefined,
            title: undefined,
            domain: this.domainSelected.label ? this.domainSelected.label : undefined,
            tags: undefined
          }
        }).then(res => {
          this.foreachEssay(res.data.rows)
          this.searchFlag = !this.searchFlag
        })
      } else {
        essayQuery({
          limit: 999,
          offset: 1,
          query: {
            id: undefined,
            title: undefined,
            domain: undefined,
            tags: this.searchKey ? this.searchKey : undefined
          }
        }).then(res => {
          this.foreachEssay(res.data.rows)
          this.searchFlag = !this.searchFlag
        })
      }
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
      var _this = this
      essayQuery({
        limit: 999,
        offset: 1,
        query: {
          title: undefined,
          domain: undefined,
          tags: undefined
        }
      }).then((res) => {
        this.foreachEssay(res.data.rows)
      })
    },
    jumpToEssay(item) {
      if (this.$route.path === '/control/essay') {
        this.$router.push('/control/essay/writing?id=' + item.id)
      } else {
        this.$router.push('/note/essay?id=' + item.id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "EssayList";
</style>

