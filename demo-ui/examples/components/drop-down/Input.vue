<template>
    <div class="body">
        <div class="selector-input">
            <label for="" class="placeholder">{{ props.placeholder }}</label>
            <input type="text " class="input" :value="props.value"
            @input="searchOptions($event)" @focus="searchOptions($event)"
            @blur="keepValue(value)" ref="inputValue">
            <span class="iconfont icon-xiangxia"></span>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    reactive,
    ref
} from 'vue'
import { getCurrentInstance } from 'vue';
const props = defineProps({
    dataList: {
        type: Array,
        default: []
    },
    placeholder: {
        type: String,
        default: '请选择'
    },
    value: {
        type: String,
        default: ''
    }
})
//获得当前实例
const instance = getCurrentInstance()
const keepValue = (value: any) => {
    const _input = instance?.refs.inputValue
    if (_input.value.length >= 0) {
        _input.value = props.value
    }
    // console.log(_input)
}
const emit = defineEmits(['searchOptions'])
const searchOptions = (e: any) => {
    emit('searchOptions', e.target.value)
}

console.log(props.dataList)
</script>

<style lang="scss" scoped>

.body {
    .selector-input {
        position: relative;
        // background: red;
        width: 100%;
        height: 38px;
        line-height: 38px;

        .input {
            width: 100%;
            height: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            border-radius: 5px;
            border: 1px solid #999;
            outline: none;
            transition: all .2s linear;

            &:focus {
                border-color: skyblue;
                box-shadow: 0 0 3px skyblue;
            }

        }

        .placeholder {
            position: absolute;
            left: 16px;
            color: #999;
        }

    }

}
</style>
