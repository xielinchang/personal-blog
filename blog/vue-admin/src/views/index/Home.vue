<template>
    <div class="home">
        <div class="header">
            <div class="user-center">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style="color: #fff !important;">
                        {{ $store.state.user.name }}
                        <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <template v-slot:dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="a">首页</el-dropdown-item>
                            <el-dropdown-item command="b">修改密码</el-dropdown-item>
                            <el-dropdown-item command="c">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="main" style="width: 100%;">
            <div class="left">
                <Menu
                    :is-collapse="isCollapse"
                    :default-active="menuDefaultActive"
                    @select="select"
                />
            </div>
            <div
                class="right"
                :style="{ width: `calc(100% - ${isCollapse ? 0 : 200}px)` }"
            >
                <div class="top">
                    <div class="breadcrumb">
                        <Breadcrumb
                            :breadcrumbs="breadcrumbs"
                            :is-collapse="isCollapse"
                            @svg-click="svgClick"
                        />
                    </div>
                    <div class="tabs">
                        <Tabs
                            :tabs-active="menuTabsActive"
                            :menu-tabs="menuTabs"
                            @remove-tab="removeTab"
                        />
                    </div>
                </div>
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <!-- tabs切换时缓存组件-->
                        <keep-alive :include="$store.state.keepAlive">
                            <component :is="Component" class="view" />
                        </keep-alive>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/home/Menu'
import Breadcrumb from '@/components/home/Breadcrumb'
import Tabs from '@/components/home/Tabs'
import { removeToken } from '@/utils/cookie'
export default {
    name: 'Home',
    components: {
        Menu,
        Breadcrumb,
        Tabs
    },
    data() {
        return {
            isCollapse: false, // 左侧菜单折叠
            breadcrumbs: [],
            menuDefaultActive: '/', // 左侧菜单激活
            menuTabsActive: 'Home', // 顶部top激活
            menuTabs: [{ title: '首页', name: 'Home', path: '/' }] // 菜单tabs
        }
    },
    watch: {
        $route(newV) {
            this.routeChange()
        }
    },
    created() {
        this.setMenu()
    },
    methods: {
        routeChange() {
            this.setMenu()
        },
        select(path) {
            const routers = this.$router.getRoutes()
            for (const i in routers) {
                if (routers[i].path === path) {
                    this.$store.commit('setKeepAlive', routers[i].name)
                    break
                }
            }
        },
        setMenu() {
            const route = this.$route
            // 设置左侧菜单激活
            this.menuDefaultActive = route.path
            // 设置面包屑
            this.breadcrumbs = route.matched.filter(
                (item) => item.meta && item.meta.title && route.path !== '/'
            )
            // 激活tabs
            this.menuTabsActive = route.name
            // 设置tabs项,不存在就添加
            if (!this.menuTabs.some((item) => item.name === route.name)) {
                this.menuTabs.push({
                    title: route.meta.title,
                    name: route.name,
                    path: route.path
                })
            }
        },
        removeTab(tab) {
            if (tab === 'Home') {
                return
            }
            // 关闭tab
            this.menuTabs = this.menuTabs.filter((item) => {
                return item.name !== tab
            })
            // 关闭之后，如果当前打开页面是tab激活项，则路由访问前一个tab项
            if (tab === this.$route.name) {
                this.$router.push(this.menuTabs[this.menuTabs.length - 1].path)
            }

            this.$store.commit('removeKeepAlive', tab)
        },
        /**
     * 关闭tab，删除缓存组件，修改router里meta的keepAlive为false
     */
        noKeepAlive(tab) {
            const routers = this.$router.getRoutes()
            for (const i in routers) {
                if (routers[i].name === tab) {
                    routers[i].meta.keepAlive = false
                    break
                }
            }
            console.log(routers)
        },
        /**
     * 点击左侧菜单，重新激活
     */
        needKeepAlive(path) {
            const routers = this.$router.getRoutes()
            for (const i in routers) {
                if (routers[i].path === path && routers[i].meta.keep) {
                    routers[i].meta.keepAlive = true
                    break
                }
            }
            console.log(routers)
        },
        svgClick() {
            this.isCollapse = !this.isCollapse
        },
        handleCommand(command) {
            switch (command) {
                case 'a':
                    this.$router.push('/')
                    break
                case 'b':
                    this.$router.push('/change/psw')
                    break
                case 'c':
                    removeToken('token')
                    this.$store.commit('reSetRouters')
                    this.$store.commit('reSetUserInfo')
                    this.$router.push('/login')
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$baseColor: #409eff;
$headerHeight: 60px;
.el-dropdown__popper .el-dropdown-menu {
  text-align: center !important;
}
.home {
  .header {
    height: $headerHeight !important;
    padding: 0 !important;
    background: $baseColor;
    position: relative;
    .user-center {
      position: absolute;
      right: 30px;
      top: 20px;
      ::v-deep .el-dropdown {
        .el-dropdown-link {
          cursor: pointer;
        }
      }
    }
  }
  .main {
    height: calc(100vh - #{$headerHeight});
    display: flex;
    margin: 0;
    .left {
      height: 100%;
    }
    .right {
      height: 100%;
      .top {
        height: 70px;
        box-sizing: border-box;
        .breadcrumb {
          padding: 5px 10px;
        }
      }
      .content {
        height: calc(100% - 30px);
        overflow-y: auto;
        padding: 5px 10px 30px 10px;
        box-sizing: border-box;
        background-color: rgba(238, 238, 238, 0.3);
      }
    }
  }
}
</style>
