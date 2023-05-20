<template>
    <el-menu-item
        v-if="item.children.length === 0 || item.children.length === 1"
        :index="hasOneOrZeroChlid(item, 'path')"
    >
        <svg-icon :name="hasOneOrZeroChlid(item, 'meta_icon')" class="svg-icon" />
        <template v-slot:title>
            <span class="menu-title">{{ hasOneOrZeroChlid(item, 'meta_title') }}</span>
        </template>
    </el-menu-item>
    <el-submenu v-else :key="item.id" :index="item.path">
        <template v-slot:title>
            <svg-icon :name="item.meta_icon" class="svg-icon" />
            <span class="menu-title">{{ item.meta_title }}</span>
        </template>
        <MenuItem v-for="chlid in item.children" :key="chlid.id" :item="chlid" />
    </el-submenu>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        item: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    methods: {
        hasOneOrZeroChlid(item, key) {
            if (item.children.length === 0) {
                return item[key] || ''
            } else {
                return item.children[0][key] || ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.menu-title {
  padding-left: 5px;
}
.svg-icon {
  height: 20px;
  width: 20px;
}
</style>
