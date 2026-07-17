# QueryPage 文档

## 安装

```javascript
import { createApp } from 'vue';
import { jQueryPage } from 'joyDesign';

const app = createApp();
app.use(jQueryPage);
```

## 基础分页

QueryPage 组件的基本使用

:::demo 基本样式

queryPage/basic

:::

## 总页数

:::demo 显示总的页数

queryPage/totalPage

:::

## 跳转页数

:::demo 跳转至第几页

queryPage/jumpPage

:::

## 页面大小

:::demo 切换每一页的条目数

queryPage/pageSize

:::

## 自定义样式

:::demo 自定义样式

queryPage/stylePage

:::

## 所有功能

:::demo 全部功能

queryPage/queryPage

:::

## 分页器属性
### 基础属性
| 属性 | 说明 | 必须 | 类型 | 接收值 | 默认值 |
| --- | --- | ---- | --- | --- | --- |
| currentPage | 当前页数 | 是 | number | — | 1
| total | 总条目数 | 是 | number | — | 100
| pageSize | 每页显示的条目个数 | 是 | number | — | 5 |
| pageCount | 页码按钮数量 | 是 | number | — | 5 |
| chooseShow | 是否打开当处于第一页时自动隐藏上一页，处于最后一页时，自动隐藏下一页 | 是 | boolean | — | false |
| hoverShow | 是否打开鼠标移至...的标题提示，true:打开，false，关闭 | 是 | boolean | — | false
| jumperShow | 是否打开跳转第几页，true:打开，false，关闭 | 是 | boolean | — | false |
| totalShow | 是否打开总页数，true:打开，false，关闭 | 是 | string | — | false|
| isOneShow | 是否在只有 1 页时隐藏，true:打开，false，关闭 | 是 | boolean | — | false |
| sizeOptions | 页面大小配置，true:打开，false，关闭 | 否 | array | [{label:'标签名',value:'页码大小'}] |null |

### 点击事件

| 属性 | 说明 | 是否必须  |
| --- | --- | --- |
|change-page| 点击页码时触发，传回所在页码数| 是|
|change-page-size| 当有页码大小选择时，改变页码大小，传回当时页码大小| 否|

### 元素样式属性
在itemStyle里面定义，具体可在自定义例子查看
| 属性 | 说明 | 示例
|---|---|---|
|width|元素的宽度|30
|height|元素的高度|30
|borderRadius|元素的圆角|4
|borderWidth|元素的边框宽度|1
|fontSize|元素的字体大小,粗细|[16, 500]
|borderDefaultColor|元素的默认边框颜色|'#fff'
|borderActiveColor|元素的激活边框颜色|'#FF6000'
|backgroundColor|元素的默认背景颜色|'#F6F6F6'
|backgroundActiveColor|元素的激活背景颜色|'#FF6000'
|defaultColor|元素的默认字体颜色|'#666666'
|activeColor|元素的激活字体颜色|'#ffffff'
|marginRight|元素的间距|12
|borderStyle|元素边框样式|'#solid'

### 按钮样式属性
在btnStyle里面定义，具体可在自定义例子查看
| 属性 | 说明 | 示例
|---|---|---|
|color|按钮的箭头颜色|'#fff'
|background|按钮的背景颜色|'#FD8C01'