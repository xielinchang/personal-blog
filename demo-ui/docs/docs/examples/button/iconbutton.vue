<template>
  <p>普通图标按钮</p>
  <div class="mb-4">
    <j-button type="primary" icon="edit">编辑</j-button>
    <j-button type="success" icon="check">检查</j-button>
    <j-button type="info" icon="message">消息</j-button>
    <j-button type="warning" icon="star" icon-position="right">收藏</j-button>
    <j-button type="danger" icon="delete" icon-position="right">删除</j-button>
  </div>
  <p>圆形图标按钮</p>
  <div>
    <j-button icon="search" circle />
    <j-button type="primary" icon="edit" circle />
    <j-button type="success" icon="check" circle />
    <j-button type="info" icon="message" circle />
    <j-button type="warning" icon="star" circle />
    <j-button type="danger" icon="delete" circle />
  </div>
</template>
