<template>
  <div
    class="essay-body newblock"
    :style="{ width: width + '%' }"
  >
    <ul class="essay-list">
      <li
        v-for="(item, index) in essay_list"
        :key="index"
        class="essay-item"
        @click="jumpToEssay(item)"
      >
        <img
          class="item-main"
          :src="item.coverUrl"
        />
        <div class="item-bottom">
          <div class="item-time">{{ item.updated_at }}</div>
          <div
            class="item-title"
            :title="item.title"
          >{{ item.title }}</div>
          <ul class="item-type">
            <li
              v-for="(item, index) in essay_list[index].tags"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { essayQuery } from '@/api/essayapi'
export default {
  name: 'EssayList',
  props: {
    width: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      essay_list: []
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initEssayList()
    }
  },
  mounted() {
    this.initEssayList()
  },
  methods: {
    initEssayList() {
      var _this = this
      this.essay_list = []
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
      if (this.$route.path === '/essay/control') {
        this.$router.push('/writing?id=' + item.id)
      } else {
        this.$router.push('/note/essay?id=' + item.id)
      }
    }
  }
}
</script>

<style scpoed>
.essay-body {
  width: 98%;
  margin-left: 1%;
  height: auto;
  position: relative;
  padding: 15px 0;
  animation: flipInX;
  animation-duration: 0.8s;
}
.newblock {
  border-radius: 4px;
  background: rgb(255, 255, 255, 0.6);
}
.essay-list {
  width: 96%;
  height: auto;
  margin: auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.essay-item {
  width: 22.5%;
  height: 275px;
  margin: 0 10px;
  margin-bottom: 30px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 13px 15px rgb(31 45 61 / 15%);
}
.essay-list .essay-item:hover {
  transform: translateY(10px);
  transition: 300ms;
}
.item-main {
  width: 100%;
  height: 185px;
  position: absolute;
  top: 0;
}
.item-bottom {
  width: 100%;
  height: 90px;
  position: absolute;
  background: rgb(255, 255, 255, 0.8);
  bottom: 0;
}
.item-time {
  width: 120px;
  height: 20px;
  font-size: 12px;
  color: rgb(155, 155, 155);
  position: absolute;
  margin-left: 10px;
  margin-top: 3px;
}
.item-title {
  width: 90%;
  height: 30px;
  font-size: 16px;
  font-weight: 400;
  font-family: YouYuan;
  margin-left: 10px;
  position: absolute;
  top: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: url(http://qkongtao.cn/wp-content/uploads/2021/08/arr41-1.png),
    pointer !important;
}
.item-type {
  list-style: none;
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 26px;
  padding: 0;
  display: flex;
}
.item-type li {
  width: 55px;
  height: 20px;
  background: #e1f6da;
  color: #45c717;
  font-weight: 500;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  margin-left: 10px;
}
.item-type li:nth-child(2) {
  background: #def1ff;
  color: #31a8ff;
}
</style>

