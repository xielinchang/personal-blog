<template>
    <div>
        <div class="tabs-nav-wrap" name="header" ref="navWrap">
            <div class="tabs-inv-bar" :style="barStyle"> </div>
            <div class="side-bar" v-for="(item, index) in data.sidebarList" :key="index" @click="handleClick($event, index)"
                :class="[{ active: data.current == index }, { disabledStyle: findDisabled(index) }]"
                :style="{ '--margin-bottom': marginBottom + 'px', '--abortColor': abortColor }" @disabled="onDisabled" @change="change">
                <span style="padding-left:4px;"> {{ item }}</span>
            </div>

        </div>


        <div class="item-content">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, useSlots, reactive, nextTick, watch, getCurrentInstance, provide } from 'vue';
import jIcon from '../../icon';
const emit = defineEmits(['disabled', 'update:activeKey','change'])
const slots = useSlots()
const props = defineProps({
    value: { default: '', type: String },
    //用来表示高亮的时候的文字颜色
    fontColor: {
        type: String,
        default: 'skyblue'
    },
    //下滑bar的颜色
    barColor: {
        type: String,
        default: 'red'
    },
    barWidth:  {
        type: Number,
        default: 4
    },
    barHeight: {
        type: Number,
        default: 40
    },
    //设置相邻tab之间的距离
    marginBottom: {
        type: Number,
        default: 0
    },
    abortColor: { default: 'grey', type: String },
    height: { default: 41, type: Number }
})

const data = reactive({
    sidebarList: [],
    current: 0,
    disabledId: []
})
onMounted(() => {
    bar.marginBottom = props.marginBottom
    bar.barWidth= props.barWidth
    bar.barHeight= props.barHeight
    bar.barColor = props.barColor
    let length = slots.default().length
    let itemData = slots.default()
    for (let i = 0; i < length; i++) {
        //获取数据
        data.sidebarList.push(itemData[i].props.title)
        if (itemData[i].props.disabled !== undefined) { data.disabledId.push(i) }
    }
})
const handleClick = (e: any, index: number) => {
    // console.log(e)
    if (!findDisabled(index)) { data.current = index }
    emit('update:activeKey', data.current)
    emit('change', data.current)
    for (let i = 0; i < data.disabledId.length; i++) {
        if (data.disabledId[i] == index) {
            emit('disabled', index)
        }
    }
}
provide('currentActive', data.current)
//下滑bar的样式
const bar = reactive({
    barWidth: 4,
    barOffset: 0,
    barColor: '',
    barHeight: 0,
    marginBottom: 0
})
//返回tabbar的样式 ,不是个函数！！！
const barStyle = computed(() => {
    return {
        width: `${props.barWidth}px`,
        transform: `translate3d(0px,${bar.barOffset}px,0px)`,
        background: `${bar.barColor}`,
        height: `${bar.barHeight}px`,
        margin: `0px 0px ${bar.marginBottom}px  0px`
    }
})
const findDisabled = (e: number) => {
    if (data.disabledId.findIndex(item => item === e) !== -1) { return true }
    else return false
}
const instance = getCurrentInstance()
const updateBar = () => {
    nextTick(() => {
        const elemTabs = instance.refs.navWrap.querySelectorAll('.side-bar')
        //获取当前元素索引值
        const index = data.current
        // //获取当前选中的元素
        const elemTab = elemTabs[index]
        bar.barHeight = elemTab ? elemTab.offsetHeight : 0
        // bar.barHeight = bar.barHeight/2
        //计算需要移动的距离,当index > 0时进行累加
        if (index > 0) {
            if (!findDisabled(index)) //如果不是禁用的
            {
                let offset = 0
                for (let i = 0; i < index; i++) {
                    offset += elemTabs[i].offsetHeight + bar.marginBottom 
                }
                bar.barOffset = offset
            }

        } else {
            if (!findDisabled(index)) { bar.barOffset = 0 }
        }

    })

}
//每次检测到当前的高亮发生变化后，都更新一下
watch(() => data.current, () => {
    updateBar()
})

defineOptions({
    name: 'JSideBar',
  });
</script>

<style lang="scss" scoped>
@import './sideBar.scss';
</style>
