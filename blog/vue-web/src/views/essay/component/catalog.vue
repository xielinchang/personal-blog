<template>
  <div>
    <div
      class="catalog-box block"
      :style="justStyle"
    >
      <div class="catalog-tit">
        <span>目录:</span>
      </div>
      <ul class="catalog">
        <li
          v-for="(item, index) in catalog"
          :key="index"
          :class="activeIndex===index?'active':''"
          @click="jumpCatalog(item)"
        >
          {{ item.key }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EssayCatalog',
  props: {
    catalog: {
      type: Array,
      default: () => {
        return []
      }
    },
    //  跳转目录的偏离高度，和其他元素的高度相关
    over: {
      type: [Number],
      default: 0
    }
  },
  emits: ['jump-catalog'],
  data () {
    return {
      activeIndex: '',
      // 滚动高度，(和目录相关)
      scrollHeight: ''
    }
  },
  computed: {
    justStyle() {
      if (this.scrollHeight > 470) {
        return {
          position: 'fixed',
          top: 60 + 'px',
          right: '10%',
          width: '16%'
        }
      } else {
        return {
          position: 'absolute',
          top: 445 + 'px',
          right: 0,
          width: '20%'
        }
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const el = document.documentElement
      this.scrollHeight = el.scrollTop
      const cur = this.scrollHeight
      for (let i = 0; i < this.catalog.length - 1; i++) {
        const top = document.getElementById(this.catalog[i].id).offsetTop
        const bottom = document.getElementById(this.catalog[i + 1].id).offsetTop
        if (cur > top + this.over && cur < bottom + this.over) {
          this.activeIndex = i
        }
        // 头尾特殊处理
        if (i === this.catalog.length - 2) {
          if (cur > top + this.over) {
            this.activeIndex = this.catalog.length - 1
          }
        } if (i === 0) {
          if (cur < bottom + this.over) {
            this.activeIndex = i
          }
        }
      }
    },
    jumpCatalog(item) {
      this.$emit('jump-catalog', item)
    }

  }
}
</script>
<style lang='scss' scoped>
$opacityColor: rgb(255, 255, 255, 0.95);
      .catalog-box {
        width: 100%;
        height: auto;
        position: absolute;
        overflow: hidden;
        max-height: calc(100vh - 100px);
        right: 0;
        margin-right: 0;
        border-radius: 4px;
        background-color: white;
        & .catalog-tit {
          width: 100%;
          position: relative;
          text-align: center;
          height: 40px;
          padding: 10px 0;
          & span{
            position: absolute;
            width: 80px;
            left: 10px;
            top: 10px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 30px;
            z-index: 1;
            color: #666;
            letter-spacing: 3px;
            line-height: 40px;
            background-color: #eee;
          }
        }
        .catalog {
          list-style: none;
          width: 98%;
          height: auto;
          background: $opacityColor;
          color: #666;
          box-sizing: border-box;
          z-index: 2;
          max-height: calc(100vh - 200px);
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
            height: auto;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #eee;
            border-radius: 30px;
          }
          & li {
            margin: 15px 0px;
            padding: 0px 15px;
          }
          & li:nth-child(1){
            margin-top: 5px;
          }
          & li:hover {
            background-color: #fafafa;
            transition: 300ms;
            color: var(--rainbow0);
          }
          .active{
            background-color: #fafafa;
            transition: 300ms;
            color: var(--rainbow0);
          }
        }
      }

      @media (max-width: 1300px) {
        .catalog-box {
          display: none;
        }
      }
</style>
