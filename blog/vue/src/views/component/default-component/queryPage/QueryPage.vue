<template>
  <div
    v-show="isOneShow === true ? ( total / pageSize * 1 <= 1 ? false : true) : true"
    class="query-page"
  >
    <!-- 显示总页数 -->
    <div
      v-show="totalShow == true"
      class="total-page"
      :style="{
        /* 与分页器对齐 */
        marginTop: itemStyle.height - 22 + 'px',
      }"
    >
      共
      {{ total }}
      条
    </div>
    <!-- 选择一页所展示的条目 -->
    <div
      v-show="sizeOptions.length > 0"
      class="page-size"
    >
      <my-select
        :options="sizeOptions"
        :selected="selectedValue"
        :width="100"
        :height="30"
        style="margin: 0 10px"
        @change-select="changeSelect"
      ></my-select>
    </div>
    <div
      class="query-btn"
      @click="prevEvent"
    ><svg-icon
      icon-name="arrow-left"
      :color="btnStyle.color"
    ></svg-icon></div>
    <div
      v-for="(item, index) in pageList"
      :key="index"
      :right-title="item == '...' ? (index < pageCount / 2 ? '向前五页' : '向后五页') : null"
      class="page-mian-item"
      :style="justStyle(item, index)"
      @click="itemEvent(item, index)"
    >
      {{ item }}
    </div>
    <div
      class="query-btn"
      @click="nextEvent"
    ><svg-icon
      icon-name="arrow-right"
      :color="btnStyle.color"
    ></svg-icon></div>
    <div
      v-show="jumperShow == true"
      class="to-page"
      :style="{
        /* 与分页器对齐 */
        marginTop: itemStyle.height - 22 + 'px',
      }"
    >
      <span>前往</span>
      <input
        v-model="toNumber"
        type="text"
        @blur="handleAddNumber(toNumber)"
        @keyup.enter="handleAddNumber(toNumber)"
      />
      <span>页</span>
    </div>
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
    itemStyle: {
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
    btnStyle: {
      type: Object,
      default: () => {
        return {
          color: '#fff',
          background: '#FD8C01'
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
    },
    // 是否打开鼠标移至...的标题提示，true:打开，false，关闭
    hoverShow: {
      type: Boolean,
      default: true
    },
    // 是否打开跳转第几页，true:打开，false，关闭
    jumperShow: {
      type: Boolean,
      default: true
    },
    // 是否打开总页数，true:打开，false，关闭
    totalShow: {
      type: Boolean,
      default: true
    },
    // 是否在只有1页时隐藏，true:打开，false，关闭
    isOneShow: {
      type: Boolean,
      default: true
    },
    // 页面大小配置
    sizeOptions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change-page', 'change-page-size'],
  data() {
    return {
      toNumber: '',
      pageTotal: 0,
      selectedValue: {
        label: '',
        value: 0
      }
    }
  },
  computed: {
    // 生成一个分页数组
    pageList() {
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
    justStyle() {
      return (item, index) => {
        return {
          // 元素的宽度
          width:
            this.itemStyle.width == null ? '27px' : this.itemStyle.width + 'px',
          // 元素的高度
          height:
            this.itemStyle.height == null
              ? '27px'
              : this.itemStyle.height + 'px',
          // 元素的圆角
          borderRadius:
            this.itemStyle.borderRadius == null
              ? '4px'
              : this.itemStyle.borderRadius + 'px',
          // 元素的边框宽度
          borderWidth:
            item === '...'
              ? this.borderWidthShow
                ? '0px'
                : this.itemStyle.borderWith == null
                  ? '1px'
                  : this.itemStyle.borderWith + 'px'
              : this.itemStyle.borderWidth == null
                ? '1px'
                : this.itemStyle.borderWith + 'px',
          // 元素的边框线条样式
          borderStyle:
            this.itemStyle.borderStyle == null
              ? 'solid'
              : this.itemStyle.borderStyle,
          // 元素的边框颜色
          borderColor:
            item === this.currentPage
              ? this.itemStyle.borderActiveColor == null
                ? '#FF6000'
                : this.itemStyle.borderActiveColor
              : this.itemStyle.borderDefaultColor
                ? '#ffffff'
                : this.itemStyle.borderDefaultColor,
          // 元素的背景颜色
          backgroundColor:
            item === this.currentPage
              ? this.itemStyle.backgroundActiveColor == null
                ? 'FF6000'
                : this.itemStyle.backgroundActiveColor
              : this.itemStyle.backgroundColor == null
                ? '#ffffff'
                : this.itemStyle.backgroundColor,
          // 元素的字体颜色
          color:
            item === this.currentPage
              ? this.itemStyle.activeColor == null
                ? '#ffffff'
                : this.itemStyle.activeColor
              : this.itemStyle.defaultColor == null
                ? '#666666'
                : this.itemStyle.defaultColor,
          // 元素的行高
          lineHeight:
            this.itemStyle.height == null
              ? '25px'
              : this.itemStyle.height - this.itemStyle.borderWith * 2 + 'px',
          // 元素的字体大小
          fontSize:
            this.itemStyle.fontSize == null
              ? '14px'
              : this.itemStyle.fontSize[0] + 'px',
          // 元素的粗细
          fontWeight:
            this.itemStyle.fontSize == null ? 500 : this.itemStyle.fontSize[1],
          // 元素的间距
          marginRight:
            this.itemStyle.marginRight == null
              ? '12px'
              : this.itemStyle.marginRight + 'px'
        }
      }
    }
  },
  watch: {
    'pageSize': function(o, n) {
      this.$emit('change-page', 1)
      this.pageTotal = Math.ceil(this.total / n)
    }
  },
  mounted () {
    if (this.sizeOptions.length > 0) {
      this.selectedValue.label = this.sizeOptions[0].label
      this.selectedValue.value = this.sizeOptions[0].value
      this.$emit('change-page-size', this.selectedValue.value)
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
      this.pageTotal = Math.ceil(this.total / this.pageSize)
      if (this.currentPage < this.pageTotal) {
        this.$emit('change-page', this.currentPage + 1)
      }
    },
    itemEvent(item, index) {
      this.pageTotal = Math.ceil(this.total / this.pageSize)
      // 按钮的中间数
      const center = Math.ceil((this.pageCount + 1) / 2)
      this.pageTotal = Math.ceil(this.total / this.pageSize)
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
          if (this.pageTotal - this.currentPage <= 5) {
            this.$emit('change-page', this.pageTotal)
          } else {
            this.$emit('change-page', this.currentPage + 5)
          }
        }
      }
    },
    handleAddNumber(toNumber) {
      this.pageTotal = Math.ceil(this.total / this.pageSize)
      if (toNumber <= 0) {
        this.toNumber = 1
        this.$emit('change-page', 1)
      } else if (this.toNumber > this.pageTotal) {
        this.toNumber = this.pageTotal
        this.$emit('change-page', this.pageTotal)
      } else {
        this.toNumber = toNumber
        this.$emit('change-page', Number(this.toNumber))
      }
    },
    changeSelect (label, value) {
      this.selectedValue.label = label
      this.selectedValue.value = value
      this.$emit('change-page-size', value)
    }
  }
}
</script>

<style lang="scss" scpoed>
.query-page {
    min-width: 300px;
    width: auto;
    height: 30px;
    display: flex;
    justify-content: center;
    .page-mian-item {
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
    }
    .hover-item[right-title]{
      position: relative;
      &:hover:after {
        opacity: 1;
        transition: all 0.1s ease 0.5s;
        visibility: visible;
      }
      // 背景的样式 位置 字体等
      &:after {
        content: attr(right-title);
        position: absolute;
        padding: 1px 10px;
        left: 24px;
        bottom: -2.5em;
        border-radius: 4px;
        color: #fff;
        background-color: rgba(80, 79, 79, 0.8);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
        font-size: 12px;
        white-space: nowrap;
        visibility: hidden;
        opacity: 0;
      }
    }
    .query-btn {
      width: 27px;
      height: 27px;
      border-radius: 4px;
      background: rgb(253, 140, 1);
      margin: 0px 10px;
      color: white;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
    }
    .total-page{
      min-width: 60px;
    }
    .to-page{
      width: auto;
      min-width: 120px;
      position: relative;
      height: 22px;
      overflow: hidden;
      display: flex;
      justify-content: left;
      margin-top: 5px;
      & span{
        font-size: 12px;
        line-height: 22px;
        margin: 0 8px;
      }
      & input{
        width: 40px;
        height: 22px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #aaa;
        outline: none;
        font-size: 12px;
        line-height: 22px;
        padding-left: 3px;
        font-weight: 300;
        &:hover{
          border: 1px solid rgb(0, 183, 255);
          color: rgb(0, 126, 176);
        }
      }
    }
    .total-page,.page-size{
      width: auto;
      height: 22px;
      font-size: 12px;
      line-height: 22px;
    }
  }
</style>
