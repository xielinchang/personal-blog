# Select 文档

## 安装

```javascript
import { createApp } from 'vue';
import { JSelect } from 'joyDesign';

const app = createApp();
app.use(JSelect);
```

## 下拉选择

Select 组件的基本使用

:::demo 基本功能

select/basic

:::

## 可搜索

:::demo 可根据关键字筛选选项

select/search

:::


## 下拉框属性

### 基础属性
| 属性 | 说明 | 必须 | 类型 | 接收值 | 默认值 |
| --- | --- | ---- | --- | --- | --- |
| selected | 被选中的选项,有label和value两个值,label为选项名称,value为选项的值,label填''为不选中 | 是 | object | — | —
| options | 所有的选项，有label和value两个属性 | 是 | object | — | —
| width | 下拉框的宽度 | 否 | number | — | 240 |
| height | 下拉框的高度 | 否 | number | — | 38 |
| type | 下拉框的类型 | 否 | string | search | — |
| placeholder | 初始的placeholder | 否 | string | — | 请选择

### 点击事件

| 属性 | 说明 | 是否必须  |
| --- | --- | --- |
|change-select| 点击选项,传回label和value值| 是|
