
<template>
    <div class="selector-menu">
        <div class="menu-item" v-for="(item, index) in data.searchList" :key="index" @click="setItemValue(item)">
            {{ item.text }}
        </div>

    </div>
</template>

<script setup lang="ts" name="">
import { reactive, ref, onMounted, watchEffect, watch } from 'vue'
const emit = defineEmits(['setItemValue'])
const data = reactive({
    searchList: []
})
//初始化时更新数据，map
onMounted(() => {
    data.searchList = props.dataList

})

const filterData = (value: any) => {
    // console.log(value)
    data.searchList = props.dataList.filter((item: any) => {
        return item.text.toLowerCase().includes(props.searchValue.toLowerCase())
    })
}
watch(() => {
    console.log('watch')
    return props.searchValue
    // filterData()
}, (value:any) => {
    filterData(value)
})

const props = defineProps({
    dataList: {
        type: Array as any,
        default: () => {
            return [
                {
                    id: 1,
                    value: '1',
                    text: '选项1'
                },
                {
                    id: 2,
                    value: '2',
                    text: '选项2'
                },
                {
                    id: 3,
                    value: '3',
                    text: '选项3'
                }
            ]
        }
    },
    searchValue: {
        type: String,
        default: ''
    }
})
const setItemValue = (item: any) => {
    emit('setItemValue', item)
}

</script>

<style scoped lang="scss">
.selector-menu {
    display: none;
    position: absolute;
    left: 0;
    top: 48px;
    width: 100%;
    background: white;
    box-shadow: #ddd;
    border-radius: 5px;
    cursor: pointer;

    .menu-item {
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 14px;
        margin: 10px 0;

        &:hover {
            background-color: #ededed;
        }
    }
}
</style>
