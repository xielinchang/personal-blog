<template>
    <div class="home-tabs">
        <el-tabs v-model="menuTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane
                v-for="item in menuTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            />
        </el-tabs>
    </div>
</template>

<script>
export default {
    props: {
        tabsActive: {
            type: String,
            default: () => 'Home'
        },
        menuTabs: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            menuTabsValue: '/'
        }
    },
    watch: {
        tabsActive(newV) {
            this.menuTabsValue = newV
        }
    },
    created() {
        this.menuTabsValue = this.tabsActive
    },
    methods: {
        tabClick(tab) {
            const routers = this.$router.getRoutes()
            let path = '/'
            let query = {}
            for (const item of routers) {
                if (item.name === tab.paneName) {
                    path = item.path
                    query = item.query
                    break
                }
            }
            this.$router.push({ path, query })
        },
        removeTab(tab) {
            this.$emit('remove-tab', tab)
        }
    }
}
</script>

<style lang="scss" scoped>
.home-tabs {
    ::v-deep .el-tabs__item {
        height: 30px;
        line-height: 30px;
    }
    ::v-deep .el-tabs__nav {
        border-radius: 0;
        background: #fff;
    }
}
</style>
