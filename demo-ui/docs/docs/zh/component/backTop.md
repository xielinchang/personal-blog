# QueryPage 文档

## 安装

```javascript
import { createApp } from 'vue';
import { jBackTop } from 'joyDesign';

const app = createApp();
app.use(jBackTop);
```

## 基础样式

BackTop 组件的基本使用

:::demo 基本样式，下拉可在右下角查看

backTop/basic

:::

## 类型

:::demo 可变换类型，图标颜色，方向，下拉在左下角查看

backTop/type

:::

## 分页器属性
### 基础属性
| 属性 | 说明 | 必须 | 类型 | 接收值 | 默认值 |
| --- | --- | ---- | --- | --- | --- |
| type | 样式 | 否 | string | default,round| default
| color | 颜色 | 否 | string | —| —
| direction | 方向 | 否 | string | right,left| right