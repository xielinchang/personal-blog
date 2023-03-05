<template>
  <div class="essayControl">
    <TemplatePage class="write-template"></TemplatePage>
    <ControlTabVue default-name="文章"></ControlTabVue>
    <div class="essay-control">
      <ul>
        <li
          v-for="(item, index) in essay_list"
          :key="index"
        >
          <svg-icon
            class="close"
            icon-name="close"
            color="#1AAAE0"
            size="18px"
            @click="essayDelete(item)"
          />
          <img
            class="control-item-img"
            :src="item.coverUrl"
            @click="jumpToEssay(item)"
          />
          <div
            class="control-item-right"
            @click="jumpToEssay(item)"
          >
            <div class="control-item-time">{{ item.updated_at }}</div>
            <div
              class="control-item-title"
              :data-title="item.title"
            >
              {{ item.title }}
            </div>
            <div
              class="item-sub-title"
              :data-title="item.subtitle"
            >
              {{ item.subtitle }}
            </div>
            <ul class="control-item-type">
              <li
                v-for="(item, index) in essay_list[index].tags"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="add-essay-container">
            <div class="add-essay">
              <svg-icon
                class="add"
                icon-name="add"
                size="70px"
                color="#F1DA4E"
                :data-title="'添加一篇新文章'"
                @click="jumpToAddEssay()"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { essayQuery, essayDelete } from '@/api/essayapi'
import 'animate.css'
export default {
  name: 'EssayControlPage',
  data() {
    return {
      essay_list: []
    }
  },
  created() {},
  mounted() {
    this.initEssay()
  },
  methods: {
    initEssay() {
      this.essay_list = []
      var _this = this
      essayQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then((res) => {
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[i].tags = res.data.rows[i].tags.split(',')
          res.data.rows[i].coverUrl =
            process.env.VUE_APP_BASE_API + res.data.rows[i].coverUrl
          this.essay_list.push(res.data.rows[i])
        }
      })
    },
    jumpToEssay(item) {
      this.$router.push('/writing?id=' + item.id)
    },
    jumpToAddEssay() {
      this.$router.push('/writing?id=' + undefined)
    },
    essayDelete(item) {
      this.$confirm('是否删除名为' + item.title + '的文章', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(item.id)
          essayDelete({ id: item.id }).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initEssay()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
  <style lang="scss" scoped>
@import './scss/EssayControl.scss'
</style>
