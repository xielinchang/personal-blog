<template>
  <div class="query-page">
    <div
      class="query-btn"
      @click="prevEvent"
    >＜</div>
    <div
      v-for="(item, index) in pageList"
      :key="index"
      :data-title="item == '...' ? (index < pageCount / 2 ? '向前五页' : '向后五页') : ''"
      class="page-mian-item"
      :style="justStlye(item, index)"
      @click="itemEvent(item, index)"
    >
      {{ item }}
    </div>
    <div
      class="query-btn"
      @click="nextEvent"
    >＞</div>
  </div>
</template>

<script>
export default {
  name: 'QueryPage',
  props: {
    // 当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 总条目数
    total: {
      type: Number,
      default: 10,
      required: true
    },
    // 每页显示的条目个数
    pageSize: {
      type: Number,
      default: 5,
      required: true
    },
    // 页码按钮数量
    pageCount: {
      type: Number,
      default: 5,
      required: true
    },
    // 分页元素的尺寸
    itemStlye: {
      type: Object,
      default: () => {
        return {
          // 元素的宽度
          width: 27,
          // 元素的高度
          height: 27,
          // 元素的圆角
          borderRadius: 4,
          // 元素的边框宽度
          borderWith: 1,
          // 元素的字体大小,粗细
          fontSize: [14, 500],
          // 元素的默认边框颜色
          borderDefaultColor: '#666677',
          // 元素的激活边框颜色
          borderActiveColor: '#FF6000',
          // 元素的默认背景颜色
          backgroundColor: '#ffffff',
          // 元素的激活背景颜色
          backgroundActiveColor: '#FF6000',
          // 元素的默认字体颜色
          defaultColor: '#666666',
          // 元素的激活字体颜色
          activeColor: '#ffffff',
          // 元素的间距
          marginRight: 12,
          // 元素边框样式
          borderStyle: 'solid'
        }
      }
    },
    // 省略号是否需要边框  true：关闭省略号边框，false：打开省略号边框
    borderWidthShow: {
      type: Boolean,
      default: false
    },
    // 是否打开当处于第一页时自动隐藏上一页，处于最后一页时，自动隐藏下一页 true打开，false关闭
    chooseShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change-page'],
  data() {
    return {}
  },
  computed: {
    // 生成一个分页数组
    pageList() {
      // 总的页数
      const pageTotal = Math.ceil(this.total / this.pageSize)
      // 总的页数数组
      const list = []
      for (let i = 1; i <= pageTotal; i++) {
        list.push(i)
      }
      // 展示的页数数组
      if (this.pageCount < list.length) {
        // 计算分页按钮总数的中间位置
        const center = Math.ceil(this.pageCount / 2)
        // 当前页处于靠近首页的位置
        if (this.currentPage >= 1 && this.currentPage <= center) {
          const firstList = []
          if (this.pageCount === 1) {
            firstList.push(1)
          } else {
            for (let i = 0; i <= this.pageCount; i++) {
              if (i < this.pageCount - 1) {
                firstList.push(1 + i)
              } else if (i === this.pageCount - 1) {
                firstList.push('...')
              } else {
                firstList.push(pageTotal)
              }
            }
          }
          return firstList
        } else if (
          this.currentPage <= pageTotal &&
          this.currentPage >= pageTotal - center + 1
        ) {
          // 当前页处于靠近尾页的位置
          const firstList = []
          if (this.pageCount === 1) {
            firstList.push(pageTotal)
          } else {
            for (let i = this.pageCount; this.pageCount >= i && i >= 0; i--) {
              if (i > this.pageCount - 1) {
                firstList.push(1)
              } else if (i === this.pageCount - 1) {
                firstList.push('...')
              } else {
                firstList.push(pageTotal - i)
              }
            }
          }
          return firstList
        } else {
          // 当前页处于中间页的位置
          const firstList = []
          firstList.push(1)
          firstList.push('...')
          const justCenter = Math.ceil((this.pageCount - 2) / 2)
          for (let i = 1; i <= this.pageCount - 2; i++) {
            if (i < justCenter) {
              firstList.push(this.currentPage - (justCenter - i))
            } else if (i === justCenter) {
              firstList.push(this.currentPage)
            } else {
              firstList.push(this.currentPage + (i - justCenter))
            }
          }
          firstList.push('...')
          firstList.push(pageTotal)
          return firstList
        }
      } else {
        return list
      }
    },
    // 分页元素的按钮状态
    justStlye() {
      return (item, index) => {
        return {
          // 元素的宽度
          width:
            this.itemStlye.width == null ? '27px' : this.itemStlye.width + 'px',
          // 元素的高度
          height:
            this.itemStlye.height == null
              ? '27px'
              : this.itemStlye.height + 'px',
          // 元素的圆角
          borderRadius:
            this.itemStlye.borderRadius == null
              ? '4px'
              : this.itemStlye.borderRadius + 'px',
          // 元素的边框宽度
          borderWidth:
            item === '...'
              ? this.borderWidthShow
                ? '0px'
                : this.itemStlye.borderWith == null
                  ? '1px'
                  : this.itemStlye.borderWith + 'px'
              : this.itemStlye.borderWidth == null
                ? '1px'
                : this.itemStlye.borderWith + 'px',
          // 元素的边框线条样式
          borderStyle:
            this.itemStlye.borderStyle == null
              ? 'solid'
              : this.itemStlye.borderStyle,
          // 元素的边框颜色
          borderColor:
            item === this.currentPage
              ? this.itemStlye.borderActiveColor == null
                ? '#FF6000'
                : this.itemStlye.borderActiveColor
              : this.itemStlye.borderDefaultColor
                ? '#ffffff'
                : this.itemStlye.borderDefaultColor,
          // 元素的背景颜色
          backgroundColor:
            item === this.currentPage
              ? this.itemStlye.backgroundActiveColor == null
                ? 'FF6000'
                : this.itemStlye.backgroundActiveColor
              : this.itemStlye.backgroundColor == null
                ? '#ffffff'
                : this.itemStlye.backgroundColor,
          // 元素的字体颜色
          color:
            item === this.currentPage
              ? this.itemStlye.activeColor == null
                ? '#ffffff'
                : this.itemStlye.activeColor
              : this.itemStlye.defaultColor == null
                ? '#666666'
                : this.itemStlye.defaultColor,
          // 元素的行高
          lineHeight:
            this.itemStlye.height == null
              ? '25px'
              : this.itemStlye.height - this.itemStlye.borderWith * 2 + 'px',
          // 元素的字体大小
          fontSize:
            this.itemStlye.fontSize == null
              ? '14px'
              : this.itemStlye.fontSize[0] + 'px',
          // 元素的粗细
          fontWeight:
            this.itemStlye.fontSize == null ? 500 : this.itemStlye.fontSize[1],
          // 元素的间距
          marginRight:
            this.itemStlye.marginRight == null
              ? '12px'
              : this.itemStlye.marginRight + 'px'
        }
      }
    }
  },
  methods: {
    /* 函数名要对应，要完全相同，'-'和驼峰不能相等 */
    prevEvent() {
      if (this.currentPage > 1) {
        this.$emit('change-page', this.currentPage - 1)
      }
    },
    // 下一页点击事件
    nextEvent() {
      // 总的页数
      const pageTotal = Math.ceil(this.total / this.pageSize)
      if (this.currentPage < pageTotal) {
        this.$emit('change-page', this.currentPage + 1)
      }
    },
    itemEvent(item, index) {
      // 按钮的中间数
      const center = Math.ceil((this.pageCount + 1) / 2)
      const pageTotal = Math.ceil(this.total / this.pageSize)
      if (item !== '...' && item !== this.currentPage) {
        this.$emit('change-page', item)
      } else if (item === '...') {
        if (index + 1 <= center) {
          if (this.currentPage <= 5) {
            this.$emit('change-page', 1)
          } else {
            this.$emit('change-page', this.currentPage - 5)
          }
        } else {
          if (pageTotal - this.currentPage <= 5) {
            this.$emit('change-page', pageTotal)
          } else {
            this.$emit('change-page', this.currentPage + 5)
          }
        }
      }
    }
  }
}
</script>

<style>
.query-page {
  width: 380px;
  height: 30px;
  display: flex;
  justify-content: center;
}
.page-mian-item {
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  margin: 0 5px;
}
.query-btn {
  width: 27px;
  height: 27px;
  border-radius: 4px;
  border: 1px solid rgb(255, 162, 75);
  background: rgb(253, 140, 1);
  margin: 0px 10px;
  color: white;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
