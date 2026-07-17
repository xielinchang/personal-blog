<template>
    <div class="body">
        <div class="selector" v-focus :style="{width:width}">
            <selector-input :placeholder="props.placeholder" :value="state.inputValue" @searchOptions="searchOptions">
            </selector-input>
            <selector-item :dataList="dataList" @setItemValue="setItemValue" :searchValue="state.searchValue"></selector-item>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    onMounted,
    reactive,
    ref,
    toRefs
} from 'vue'

import selectorInput from './Input.vue'
import selectorItem from './Menu.vue'
const vFocus = {
    mounted(el: any) {
        console.log(el)
        const oSelectorInput = el.querySelector('.selector-input');
        const oInput = oSelectorInput.querySelector('input'),
            oPlaceHolder = oSelectorInput.querySelector('label'),
            oIcon = oSelectorInput.querySelector('span');
        //选择菜单
        // 注意这里在选择菜单上的时候一定那移开，display:none后无法绑定事件，需要延迟时间
        const oSelectorMenu = el.querySelector('.selector-menu')

        oInput.addEventListener('focus', () => {
            oPlaceHolder.style.display = 'none';
            oIcon.className = '' //修改icon;
            setTimeout(() => {
                oSelectorMenu.style.display = 'block'
            }, 200)
        }, false)
        oInput.addEventListener('blur', () => {
            oIcon.className = ''; //修改icon;
            setTimeout(() => {
                oSelectorMenu.style.display = 'none'
                if(state.inputValue.length ===0)
                {
                    oPlaceHolder.style.display = 'block';
                }
            }, 200)
        }, false)


    }

}
onMounted(()=>{
    state.isSearch = props.isSearch
    console.log(state.isSearch,'state')
})
const state = reactive({
    inputValue: '',
    searchValue:'',
    isSearch:true
})
const props = defineProps({
    dataList: {
        type: Array,
        default: []
    },
    placeholder: {
        type: String,
        default: '请选择'
    },
    width:{
        type:String,
        default:' width: 300px;'
    },
    isSearch:{
        type:Boolean,
        default:true
    }
})

const emit = defineEmits(['setItemValue'])
//点击选择
const setItemValue = (item: any) => {
    state.inputValue = item.text
    emit('setItemValue', item.value)
}
//模糊插叙性能搜索功能
const searchOptions =(value:any)=>{
    console.log('searchoptions')
    // state.inputValue = value //为了避免第一次还未选择时，触发blur时判断input.value为空的，导致文字重叠
    state.searchValue = value //改变这个，menulist的内容也发生改变
}
const searchOptions1 = (value:any)=>{

}
</script>

<style lang="scss" scoped>
.body {
    .selector {
        position: relative;
        // background: pink;
    }
}
</style>
