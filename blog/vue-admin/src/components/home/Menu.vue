<!--
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-14 11:25:04
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-06 15:08:16
-->
<template>
    <div class="home-menu">
        <el-menu
            :default-active="defaultActive"
            router
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :collapse-transition="true"
            @select="select"
        >
            <MenuItem v-for="item in menus" :key="item.id" :item="item" />
        </el-menu>
    </div>
</template>

<script>
import MenuItem from './MenuItem'
export default {
    components: { MenuItem },
    props: {
        isCollapse: {
            type: Boolean,
            default: () => false
        },
        defaultActive: {
            type: String,
            default: () => '/'
        }
    },
    computed: {
        menus() {
            const routers = this.$store.getters.routers
            return this.filterAsyncRouter(routers)
        }
    },
    methods: {
        select(path) {
            this.$emit('select', path)
        },
        // 过滤hidden为1的数据,不在侧边菜单显示
        filterAsyncRouter(routers) {
            const accessedRouters = routers.filter((router) => {
                if (router.hidden === '1') {
                    return false
                } else if (router.children && router.children.length) {
                    router.children = this.filterAsyncRouter(router.children)
                }
                return true
            })
            return accessedRouters
        }
    }
}
</script>

<style lang="scss" scoped>
.home-menu {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
