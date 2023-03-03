<script lang="ts" setup>
import { reactive } from 'vue';
import jButton from '../../button';
import { defineEmits } from 'vue';
let emit = defineEmits(['submitmessage'])
//表单
const formdata = reactive({
    name: '',
    age: '',
    year: '',
    mouth: '',
    day: '',
    phone: '',
    card: '',
    adress: ''

})
const submit = (a) => {
    if (a.name == '') {
        alert('姓名不能为空')
    } else if (a.age == '') {
        alert("年龄不能为空")
    } else if (a.card == '') {
        alert("身份证号不能为空")
    } else if (a.phone == '') {
        alert("电话不能为空")
    } else if (a.adress == '') {
        alert("地址不能为空")
    } else {
        emit('submitmessage', a);
    }

}
defineOptions({
    name: ' JTableform',
});
</script>

<template>
    <div class="form">
        <div>
            <span>姓名：</span><input type="text" class="name" v-model="formdata.name">

        </div>
        <div>
            <span>年龄：</span><input type="number" class="age" v-model="formdata.age">

        </div>
        <div>
            <span>出生年月：</span><input type="number" class="year" v-model="formdata.year">年<input type="number" class="mouth"
                v-model="formdata.mouth">月<input type="number" class="days" v-model="formdata.day">日

        </div>
        <div>
            <span>身份证号：</span><input type="number" class="cardnumber" v-model="formdata.card">

        </div>
        <div>
            <span>电话号码：</span><input type="tel" class="cardnumber" v-model="formdata.phone">

        </div>
        <div>
            <span>家庭住址：</span><input type="text" class="cardnumber" v-model="formdata.adress">
            <j-button type="primary" @click="submit(formdata)" class="submit">确认</j-button>
        </div>

    </div>
</template>


<style scoped lang="scss">
.form {
    display: flex;
    flex-direction: column;

    .year {
        width: 50px;

    }

    .mouth {
        width: 50px;
    }

    .days {
        width: 50px;
    }

    .submit {
        width: 50px;
        margin-left: 100px;
    }

    .name {
        margin-left: 33px;
    }

    .age {
        margin-left: 33px;
    }

    input {
        height: 20px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }

    input:focus {
        border-color: skyblue;
        outline-style: none;
        box-shadow: 0 0 3px skyblue;
    }
}
</style>