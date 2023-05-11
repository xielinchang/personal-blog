<template>
  <div
    class="right-btn"
  >
    <icon-button
      :left-title="hasSearch==0?'更多搜索':'取消'"
      :icon="hasSearch==0?'search-filled':'close'"
      @click.native="searchShow()"
    ></icon-button>
    <router-link to="/register">
      <IconButton
        left-title="注册"
        icon="register"
      ></IconButton>
    </router-link>
    <IconButton
      :left-title="$store.state.click.clickShow?'关闭点击特效' : '打开点击特效'"
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
  computed: {
    hasSearch() {
      return Object.keys(this.$route.query).length
    }
  },
  created () {
    this.domainOptions = this.$store.state.dictionary.domain
    this.essaySearchList = this.$store.state.dictionary.essaySearchList
  },
  mounted() {

  },
  methods: {
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
      if (this.$store.state.click.clickShow) {
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
      this.$store.state.click.clickShow = !this.$store.state.click.clickShow
    }
  }
}
</script>
<style lang="scss" scoped>
.right-btn{
  z-index: 999;
  width: 40px;
  height: calc(40px * 3 + 2 * 10px);
  display: flex;
  position: fixed;
  flex-direction: column;
  bottom: 80px;
  right: 50px;
  justify-content: space-between;
}
.search-box{
  width: 100%;
  height: calc(100vh);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  .shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(0,0,0,0.7);
  }
  .search-main{
    z-index:10000;
    border-radius: 4px;
    position: absolute;
    width: 50%;
    margin-left: 25%;
    height: 50px;
    background: rgb(255,255,255,0.5);
    top: calc(50vh);
    transform: translateY(-50%);
    & .search{
      margin-top: 5px;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
