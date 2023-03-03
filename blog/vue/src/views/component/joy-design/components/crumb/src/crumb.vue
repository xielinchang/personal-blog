<template>
  <div class="brandbox">
    <ul class="brand">
      <li v-for="(brands, index) in brandsInfo" :key="index" @click="changeCrumb(brands,index)"
        ><a>{{ brands.name }}</a></li
      >
    </ul>
    <ul class="crumb">
      <li
        v-for="(brands, index) in brandsInfo"
        :key="index"
        @click="closeCrumb(brands,index)"
        class="singlecrumb"
        v-show="brands.showinfo"
        >{{ brands.name }}<j-icon size="12px" name="close"></j-icon
      ></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { crumbEvent } from "./crumb";
import JIcon from '../../icon';
import { reactive } from "vue";
import { defineEmits } from 'vue';
let emit = defineEmits(['loadcrumb','downLoadCrumb'])

  const crumbProps = defineProps(crumbEvent.crumbProps);
  const brandsInfo:Array=reactive(crumbProps.brandsInfo)
  const changeCrumb = (brands: any,index:Number) => {
    for(let i=0;i<=index;i++){
      brandsInfo[i].showinfo=true
    }
    brands.showinfo = true;
    emit('loadcrumb',brands)
  };
  const closeCrumb = (brands: any,index:Number) => {
    for(let i=index;i<brandsInfo.length;i++){
      brandsInfo[i].showinfo=false
    }
    emit('downLoadCrumb',brands)
  };

  defineOptions({
    name: 'crumb',
  });
</script>

<style scoped lang="scss">
  @import url(./crumb.scss);
</style>
