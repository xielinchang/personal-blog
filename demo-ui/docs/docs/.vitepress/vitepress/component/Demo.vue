<template>
  <div>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <!-- <Example :file="path" :demo="formatPathDemos[path]" /> -->
      <div class="example-showcase">
        <component :is="formatPathDemos[path]" v-if="formatPathDemos[path]" />
      </div>

      <div class="op-btns">
        <span class="op-btn" @click="copyCode">复制</span>
        <span class="op-btn" @click="toggleSourceVisible">显示源代码</span>
      </div>

      <VTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </VTransition>

      <Transition name="fade">
        <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible()">
          <!-- <VIcon class="op-btn" name="icon-sanjiao2"></VIcon> -->
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import message from './message';
import { useClipboard } from '@vueuse/core';
import SourceCode from './v-source-code.vue';
import VTransition from './v-transition.vue';

const demos = import.meta.globEager('../../../examples/**/*.vue')

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const n = 'button/basic'

const formatPathDemos = computed(() => {
  const demoObj = {}

  Object.keys(demos || {}).forEach(key => {
    demoObj[key.replace('../../../examples/', '').replace('.vue', '')] =
      demos[key].default
  })

  return demoObj
})

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
});

const copyCode = async () => {
  if (!isSupported) {
    message.error('复制失败');
  }
  try {
    await copy();
    message.info('复制成功');
  } catch (e: any) {
    message.error('复制失败');
  }
};

const sourceVisible = ref<boolean>(false);
const toggleSourceVisible = () => {
  sourceVisible.value = !sourceVisible.value;
};


const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)


</script>

<style lang="scss">
.example-showcase {
  padding: 0.8rem;
  margin: 0.5px;

  >.van-icon {
    margin-right: 16px;
    font-size: 26px;
  }
}

.example {
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    .op-btns {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 2.5rem;
      font-size: 14px;
      border-top: 1px solid var(--vp-c-divider);

      .op-btn {
        margin: 0 0.5rem;
        cursor: pointer;
        color: var(--vp-c-brand-lighter);
        transition: 0.2s;
        &:hover {
          color: var(--vp-c-brand);
        }
      }
    }
    &-float-control {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--vp-c-divider);
      height: 44px;
      box-sizing: border-box;
      // background-color: var(--bg-color, #fff);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      margin-top: -1px;
      color: var(--vp-c-brand-lighter);
      cursor: pointer;
      position: sticky;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      font-size: 14px;
      span {
        margin-left: 10px;
      }

      &:hover {
        color: var(--vp-c-brand);
      }
    }
  }
</style>
