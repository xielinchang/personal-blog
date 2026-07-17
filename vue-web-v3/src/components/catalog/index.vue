<template>
  <div>
    <div class="catalog-box" :style="justStyle">
      <div class="catalog-tit">
        <span>Catalog:</span>
      </div>
      <ul class="catalog">
        <li
          v-for="(item, index) in catalog"
          :key="index"
          :class="activeIndex === index ? 'content-active' : ''"
          @click="jumpCatalog(item)"
        >
          <div v-if="item.key.length > 0" class="content" :class="activeIndex === index ? 'content-active' : ''">{{ item.key }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
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
})

const emit = defineEmits(['jump-catalog'])

const activeIndex = ref('')
const scrollHeight = ref('')

const justStyle = computed(() => {
  if (scrollHeight.value > 470) {
    return {
      position: 'fixed',
      top: 60 + 'px',
      right: '20%',
      width: '220px'
    }
  } else {
    return {
      position: 'absolute',
      top: 50 + 'px',
      right: 0,
      width: '220px'
    }
  }
})

const onScroll = () => {
  const el = document.documentElement
  const catalog = document.querySelector('.catalog')
  const catalogItems = document.querySelectorAll('.catalog li')
  scrollHeight.value = el.scrollTop
  const cur = scrollHeight.value
  for (let i = 0; i < props.catalog.length - 1; i++) {
    const topEl = document.getElementById(
      props.catalog[i].id
    )
    const bottomEl = document.getElementById(
      props.catalog[i + 1].id
    )
    if (topEl && bottomEl) {
      var top = topEl.offsetTop
      var bottom = bottomEl.offsetTop
    } else {
      return
    }
    // 减10是为了点击跳转时在顶部留下一点空间，使跳转后目录的高亮不会显示到上一级
    if (cur > top + props.over - 10 && cur < bottom + props.over - 10) {
      activeIndex.value = i
      // catalog滚到指定的高度 需要减去它本身的高度
      catalog.scrollTop = catalogItems[i].offsetTop - catalogItems[i].clientHeight - 10
    }
    // 头尾特殊处理
    if (
      i === props.catalog.length - 2 &&
                  cur >= bottom + props.over - 10
    ) {
      activeIndex.value = i + 1
    }
    if (i === 0 && cur <= bottom + props.over - 10) {
      activeIndex.value = i
    }
  }
}

const jumpCatalog = (item) => {
  emit('jump-catalog', item)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
  <style lang='scss' scoped>
  $opacityColor: rgb(255, 255, 255, 0.95);
  .catalog-box {
      width: 100%;
      height: auto;
      position: absolute;
      // overflow: hidden;
      max-height: calc(100vh - 100px);
      right: 0;
      margin-right: 0;
      border-radius: 10px;
      background-color: var(--opacity4);
      & .catalog-tit {
          width: 100%;
          position: relative;
          text-align: center;
          height: 40px;
          padding: 10px 0;
          & span {
              position: absolute;
              width: 80px;
              left: 10px;
              top: 10px;
              font-size: 18px;
              font-weight: 600;
              border-radius: 30px;
              z-index: 1;
              color: var(--text7);
              letter-spacing: 3px;
              font-weight: 800;
              line-height: 40px;
              // background-color: var(--active0);
          }
      }
      .catalog {
          list-style: none;
          width: 100%;
          height: auto;
          box-sizing: border-box;
          z-index: 2;
          font-size: 1.2rem;
          max-height: calc(100vh - 200px);
          overflow-y: scroll;
          &::-webkit-scrollbar {
              width: 4px;
              height: auto;
          }
          &::-webkit-scrollbar-thumb {
              background-color: var(--line6);
              border-radius: 30px;
          }
          & li {
              width: 80%;
              height: auto;
              min-height: 30px;
              line-height: 30px;
              border-radius: 10px;
              overflow: hidden;
              z-index: 2;
              position: relative;
              text-align: center;

              margin: 10px 0;
              margin-left: 10%;
              .content {
                  width: 100%;
                  color: var(--text7);
                  text-align: left;
                  font-size: 1rem;
                  padding: 10px;
                  box-sizing: border-box;
              }
          }
          & li:nth-child(1) {
              margin-top: 5px;
          }
          .content-active {
              color: #fff !important;
              background: var(--success11);
          }
      }
  }

  @media (max-width: 1300px) {
      .catalog-box {
          display: none;
      }
  }
  </style>
