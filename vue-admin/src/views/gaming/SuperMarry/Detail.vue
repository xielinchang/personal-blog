<template>
  <div>
    <div class="split">
      <!-- 左侧地图区域 -->
      <div id="split-0">
        <div class="map" ref="mapContainer"></div>
      </div>
      <!-- 右侧表单区域 -->
      <div id="split-1">
        <el-form :model="data" label-width="60px" class="form">
          <el-form-item>
            <template #label>
              <span style="display: flex; gap: 4px; align-items: center;">
                Map
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content">
                    <p>
                      '.': Air,
                      '#': Wall,
                      '+': Lava,
                      '@': Player,
                      o: Coin,
                      u: Spring,
                    </p>
                    <p>
                      '=': Horizontal Lava,
                      '|': Vertical Lava,
                      v: Vertical Lava(speed faster)
                    </p>
                    <p>
                      '-': Horizontal Lava(speed faster),
                    </p>
                  </div>
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </span>
            </template>
            <el-input @focus="onMapFocus" @blur="onMapBlur" type="textarea" v-model="data.map_data"
              placeholder="Please enter map data" rows="25"></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="data.name" placeholder="Please enter name"></el-input>
          </el-form-item>
          <el-form-item label="Level">
            <el-input-number v-model="data.level" :min="1" :max="100" placeholder="Please enter level"></el-input-number>
          </el-form-item>
        </el-form>
      </div>


    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <el-button type="primary" @click="goBack">Back</el-button>
      <div class="btns">
        <el-button @click="reRenderMap">Sync current map(ctrl+s)</el-button>
        <el-button type="primary" @click="confirm">Confirm modification(add)</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Split from "split.js";
import { fetchMaps, updateMap, createMap } from "@/api/mario/maps";
import { Vec, Level, State, Player, Lava, Coin, DOMDisplay } from '../utils/GameLogic'
import { runAnimation, trackKeys } from '../utils/GameUtils'
Player.prototype.size = new Vec(0.6, 1.2)

Lava.prototype.size = new Vec(1, 1)

Coin.prototype.size = new Vec(0.6, 0.6)

export default {
  name: "SuperMarryDetail",
  data() {
    return {
      data: {
        name: "",
        level: "",
        map_data: "",

      },
      playerParams: {
        playerXSpeed: 12,
        gravity: 40,
        jumpSpeed: 15
      },
      arrowKeys: {},
    };
  },
  mounted() {
    Split(['#split-0', '#split-1'], {
      sizes: [36, 64],
    })

    this.initData();
    document.addEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    // 初始化地图数据
    async initData() {
      this.stop = true;
      await new Promise((resolve) => setTimeout(resolve, 50));
      const container = this.$refs.mapContainer;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      this.stop = false;
      const id = this.$route.query.id;
      if (id) {
        fetchMaps({
          limit: 1,
          offset: 1,
          id,
        }).then(async (res) => {
          const mapString = res.result.rows[0].map_data;
          const originalMapString = mapString.replace(/,/g, '\n')
          this.data = res.result.rows[0];
          this.data.map_data = originalMapString;
          this.initPlayer();
          this.runGame(originalMapString, DOMDisplay);
        });
      }
    },
    onMapFocus() {
      if (this.arrowKeys && typeof this.arrowKeys.remove === 'function') {
        this.arrowKeys.remove();
      }
    },
    handleKeyDown(event) {
      // 检查是否按下了Ctrl键和S键
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // 阻止默认行为，比如浏览器的保存页面操作
        this.reRenderMap();
      }
    },
    onMapBlur() {
      this.arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
    },
    async reRenderMap() {

      this.stop = true; // 停止当前的动画循环
      await new Promise((resolve) => setTimeout(resolve, 50));
      const container = this.$refs.mapContainer;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      this.stop = false;

      this.initPlayer();
      this.runGame(this.data.map_data, DOMDisplay);
    },
    initPlayer() {
      const playerXSpeed = this.playerParams.playerXSpeed * 1; // 速度
      const gravity = this.playerParams.gravity * 1; // 重力系数
      const jumpSpeed = this.playerParams.jumpSpeed * 1; // 跳的高度
      const jumpCooldown = 200 // 跳跃冷却时间（毫秒）
      const maxJumps = 2 // 最大跳跃次数
      // 玩家的更新
      Player.prototype.update = function (time, state, keys) {
        let xSpeed = 0
        if (keys.isDown('ArrowLeft')) xSpeed -= playerXSpeed
        if (keys.isDown('ArrowRight')) xSpeed += playerXSpeed

        let pos = this.pos
        const movedX = pos.plus(new Vec(xSpeed * time, 0))
        if (!state.level.touches(movedX, this.size, 'wall')) {
          pos = movedX
        }

        let ySpeed = this.speed.y + time * gravity
        const movedY = pos.plus(new Vec(0, ySpeed * time))

        // 检查是否在地面上
        this.onGround = state.level.touches(pos.plus(new Vec(0, this.size.y - 1)), this.size, 'wall')
  
        // 如果在地面上，重置跳跃次数
        if (this.onGround) {
          this.jumpCount = 0
        }

        // 优化跳跃逻辑
        if (keys.wasPressed('ArrowUp') &&
          keys.getPressDuration('ArrowUp') < jumpCooldown &&
          this.jumpCount < maxJumps - 1) {
          ySpeed = -jumpSpeed
          this.jumpCount++ // 增加跳跃计数
        } else if (!state.level.touches(movedY, this.size, 'wall')) {
          pos = movedY
        } else {
          ySpeed = 0
        }

        return new Player(pos, new Vec(xSpeed, ySpeed), this.jumpCount, this.onGround)
      }
    },
    async runGame(level, Display) {
      await this.runLevel(new Level(level), Display);
    },
    runLevel(level, Display) {
      const display = new Display(document.querySelector(".map"), level);
      let state = State.start(level);
      let ending = 1;
      // 设置按键
      this.arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
      return new Promise((resolve) => {
        runAnimation((time) => {
          
          state = state.update(time, this.arrowKeys);
          display.syncState(state);
          
          if (state.status === "playing") {
            if (this.stop) {
              display.clear();
              return false;
            }
            return true;
          } else if (ending > 0) {
            ending -= time;
            return true;
          } else {
            this.reRenderMap();
            display.clear();
            resolve(state.status);
            return false;
          }
        });
      });
    },
    goBack() {
      this.$router.push({ path: "/gaming/mario/map" });
    },
    confirm() {
      const id = this.$route.query.id;
      if (id) {
        updateMap({ id, ...this.data })
          .then((res) => {
            if (res.success) {
              this.initData();
              this.$message.success("Map information has been updated!");
              return;
            }
            this.$message.error(res.message);
          })
          .catch((err) => {
            this.$message.error("Update failed, please try again later!");
          });
      } else {
        createMap({ ...this.data })
          .then((res) => {
            if (res.success) {
              this.$message.success("Add map successfully");
              return this.$router.push({ path: "/gaming/mario/map" });
            }
          })
          .catch((err) => {
            this.$message.error("Response failed! err:", err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import url('./index.scss');
</style>
