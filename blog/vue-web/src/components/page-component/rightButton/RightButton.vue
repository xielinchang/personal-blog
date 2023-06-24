<template>
  <div
    class="right-btn"
  >
    <icon-button
      :left-title="isSearching()===false?'更多搜索':'取消'"
      :icon="isSearching()===false?'search-filled':'close'"
      @click.native="searchShow()"
    ></icon-button>
    <icon-button
      :left-title="$store.state.isHead?'切换侧边栏':'切换头部栏'"
      icon="change"
      @click.native="tabChange()"
    ></icon-button>
    <router-link to="/register">
      <IconButton
        left-title="注册"
        icon="register"
      ></IconButton>
    </router-link>
    <IconButton
      :left-title="$store.state.clickShow?'关闭点击特效' : '打开点击特效'"
      icon="click"
      @click.native="clickShow()"
    ></IconButton>
    <back-top
      icon-name="rocket"
      left-title="返回顶部"
    ></back-top>
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
  </div></template>

<script>
export default {
  name: 'RightButton',
  data() {
    return {
      // 搜索的关键字
      searchKey: '',
      // 搜索框是否打开
      searchFlag: false,
      essaySearchList: [],
      domainOptions: [],
      selected: {
        label: '内容',
        value: 'html'
      },
      domainSelected: {
        label: 'HTML',
        value: 'html'
      }
    }
  },
  created () {
    this.domainOptions = this.$store.state.dictionary.domain
    this.essaySearchList = this.$store.state.dictionary.essaySearchList
  },
  methods: {
    // 判断是否正在搜索
    isSearching() {
      var searchKey = Object.keys(this.$route.query)[0]
      if (this.$store.state.dictionary.essaySearchList.find(item => {
        if (item.value === searchKey) {
          return true
        } else {
          return false
        }
      })) {
        return true
      } else {
        return false
      }
    },
    offShadow() {
      this.searchFlag = !this.searchFlag
    },
    searchShow() {
      if (this.isSearching()) {
        this.$router.push('/home')
      } else {
        this.searchFlag = true
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
    search() {
      /* 根据所选来进行搜索文章 */
      this.searchFlag = !this.searchFlag
      var selected = this.selected.value
      if (selected !== 'domain') {
        this.$router.push('/home?' + selected + '=' + this.searchKey)
      } else {
        this.$router.push('/home?' + selected + '=' + this.domainSelected.label)
      }
    },
    clickShow() {
      if (this.$store.state.clickShow) {
        this.$msg({
          content: '你已取消了点击特效',
          type: 'success'
        })
      } else {
        this.$msg({
          content: '你已开启了点击特效',
          type: 'success'
        })
      }
      this.$store.state.clickShow = !this.$store.state.clickShow
    },
    tabChange() {
      this.$msg({
        content: '切换成功',
        type: 'success'
      })
      this.$store.commit('changeTab')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './RightButton.scss'
</style>
