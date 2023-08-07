<template>
  <div class="background">
    <h3 v-if="panelShow">Tips: 系数范围为1~99，获取所有金币进入下一关吧！</h3>
    <div
      v-if="panelShow"
      class="panel block"
    >
      <div class="panel-item">
        选取关卡：
        <my-select
          :options="levelOptions"
          :selected="selectedLevel"
          @change-select="changeSelect"
        ></my-select>
      </div>
      <div class="panel-item">
        速度系数：
        <my-input
          v-model="playerXSpeed"
          placeholder="参考8-18"
        ></my-input>
      </div>
      <div class="panel-item">
        重力系数：
        <my-input
          v-model="gravity"
          placeholder="参考25-35"
        ></my-input>
      </div>
      <div class="panel-item">
        弹跳系数 ：
        <my-input
          v-model="jumpSpeed"
          placeholder="参考16-24"
        ></my-input>
      </div>
      <div
        class="panel-item"
        style="justify-content: flex-end;"
      >
        <my-button @click="start">开始</my-button>
      </div>
    </div>
    <my-button
      v-else
      type="danger"
      class="exit"
      @click="exit"
    >退出</my-button>
  </div>
</template>

<script>
import { maps } from './map'
// 定义游戏坐标向量 (Vector)
class Vec {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y)
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor)
  }
}
// 读取关卡地图
class Level {
  constructor(plan) {
    const rows = plan
      .trim()
      .split('\n')
      .map((l) => [...l])
    this.height = rows.length
    this.width = rows[0].length
    this.startActors = []

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        const type = levelChars[ch]
        if (typeof type === 'string') return type
        this.startActors.push(type.create(new Vec(x, y), ch))
        return 'empty'
      })
    })
  }
}
// 持久化的数据
class State {
  constructor(level, actors, status) {
    this.level = level
    this.actors = actors
    this.status = status
  }

  static start(level) {
    return new State(level, level.startActors, 'playing')
  }
  get player() {
    return this.actors.find((a) => a.type === 'player')
  }
}
// 定义玩家
class Player {
  constructor(pos, speed) {
    this.pos = pos
    this.speed = speed
  }

  get type() {
    return 'player'
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0))
  }
}
// 角色大小
Player.prototype.size = new Vec(0.8, 1.5)

// 熔岩
class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos
    this.speed = speed
    this.reset = reset
  }

  get type() {
    return 'lava'
  }

  static create(pos, ch) {
    if (ch === '=') {
      return new Lava(pos, new Vec(2, 0))
    } else if (ch === '|') {
      return new Lava(pos, new Vec(0, 2))
    } else if (ch === 'v') {
      return new Lava(pos, new Vec(0, 3))
    }
  }
}
Lava.prototype.size = new Vec(1, 1)

// 金币
class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos
    this.basePos = basePos
    this.wobble = wobble
  }

  get type() {
    return 'coin'
  }

  static create(pos) {
    return new Coin(pos, pos, Math.random() * Math.PI * 2)
  }
}
Coin.prototype.size = new Vec(0.6, 0.6)

// 把地图抽象成代码
const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  'o': Coin,
  '=': Lava,
  '|': Lava,
  'v': Lava
}
// 绘制地图
function elt(name, attrs, ...children) {
  const dom = document.createElement(name)
  for (const attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr])
  }
  for (const child of children) {
    dom.appendChild(child)
  }
  return dom
}
// 渲染DOM
class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level))
    this.actorLayer = null
    parent.appendChild(this.dom)
  }
  // 清除DOM
  clear() {
    this.dom.remove()
  }
}
// 地图大小
const scale = 13

function drawGrid(level) {
  return elt(
    'table',
    {
      class: 'map-table',
      style: `width: ${level.width * scale}px`
    },
    ...level.rows.map((row) =>
      elt(
        'tr',
        { style: `height: ${scale}px` },
        ...row.map((type) => elt('td', { class: type }))
      )
    )
  )
}
// 绘制玛丽
function drawActors(actors) {
  return elt(
    'div',
    {},
    ...actors.map((actor) => {
      const rect = elt('div', { class: `actor ${actor.type}` })
      rect.style.width = `${actor.size.x * scale}px`
      rect.style.height = `${actor.size.y * scale}px`
      rect.style.left = `${actor.pos.x * scale}px`
      rect.style.top = `${actor.pos.y * scale}px`
      return rect
    })
  )
}
// 绘制新状态把旧的状态删除
DOMDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove()
  this.actorLayer = drawActors(state.actors)
  this.dom.appendChild(this.actorLayer)
  this.dom.className = `game ${state.status}`
  this.scrollPlayerIntoView(state)
}

// 判断运动和碰撞
DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
  const width = this.dom.clientWidth
  const height = this.dom.clientHeight
  const margin = width / 3

  // The viewport
  const left = this.dom.scrollLeft
  const right = left + width
  const top = this.dom.scrollTop
  const bottom = top + height

  const player = state.player

  const center = player.pos.plus(player.size.times(0.5)).times(scale)

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height
  }
}
// 判断碰到岩浆就取消动作
Level.prototype.touches = function (pos, size, type) {
  var xStart = Math.floor(pos.x)
  var xEnd = Math.ceil(pos.x + size.x)
  var yStart = Math.floor(pos.y)
  var yEnd = Math.ceil(pos.y + size.y)

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height
      const here = isOutside ? 'wall' : this.rows[y][x]
      if (here === type) return true
    }
  }
  return false
}
// 状态更新(判断是否碰到了岩浆)
State.prototype.update = function (time, keys) {
  // 这边actor的update方法即Lava，Coin，Player等原型的update
  const actors = this.actors.map((actor) => actor.update(time, this, keys))
  let newState = new State(this.level, actors, this.status)

  if (newState.status !== 'playing') return newState

  const player = newState.player
  if (this.level.touches(player.pos, player.size, 'lava')) {
    return new State(this.level, actors, 'lost')
  }

  for (const actor of actors) {
    if (actor !== player && overlap(actor, player)) {
      newState = actor.collide(newState)
    }
  }
  return newState
}
// 判断二者是否重叠
function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  )
}

// 判断碰到岩浆输 或者吃完金币获胜
Lava.prototype.collide = function (state) {
  return new State(state.level, state.actors, 'lost')
}

Coin.prototype.collide = function (state) {
  const filtered = state.actors.filter((a) => a !== this)
  let status = state.status
  if (!filtered.some((a) => a.type === 'coin')) status = 'won'
  return new State(state.level, filtered, status)
}

// 金币的更新
const wobbleSpeed = 8 // 金币抖动速度
const wobbleDist = 0.1 // 金币抖动幅度

Coin.prototype.update = function (time) {
  const wobble = this.wobble + time * wobbleSpeed
  const wobblePos = Math.sin(wobble) * wobbleDist
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  )
}

// 岩浆的更新
Lava.prototype.update = function (time, state) {
  const newPos = this.pos.plus(this.speed.times(time))
  if (!state.level.touches(newPos, this.size, 'wall')) {
    return new Lava(newPos, this.speed, this.reset)
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset)
  } else {
    return new Lava(this.pos, this.speed.times(-1))
  }
}

export default {
  name: 'SuperMarry',
  data() {
    return {
      arrowKeys: {},
      levelOptions: [{
        label: '关卡一',
        value: 0
      }, {
        label: '关卡二',
        value: 1
      }, {
        label: '关卡三',
        value: 2
      }, {
        label: '关卡四',
        value: 3
      }, {
        label: '关卡五',
        value: 4
      }],
      selectedLevel: {
        label: '关卡一',
        value: 0
      },
      playerXSpeed: 18,
      gravity: 25,
      jumpSpeed: 18,
      panelShow: true,
      stop: false
    }
  },
  mounted() {
    console.log(Coin.prototype)
  },
  methods: {
    // 选取关卡
    changeSelect(label, value) {
      this.selectedLevel.label = label
      this.selectedLevel.value = value
    },
    start() {
      if (this.playerXSpeed && this.gravity && this.jumpSpeed) {
        if (this.playerXSpeed < 100 && this.gravity < 100 && this.jumpSpeed < 100) {
          this.initPlayer()
          this.panelShow = false
          this.stop = false
          this.runGame(maps, DOMDisplay)
        } else {
          this.$msg({
            content: '所有的系数的范围为1-99',
            type: 'info'
          })
        }
      }
    },
    exit() {
      this.panelShow = true
      this.stop = true
    },
    // 初始化玩家，选取对应参数
    initPlayer() {
      const playerXSpeed = this.playerXSpeed * 1 // 速度
      const gravity = this.gravity * 1 // 重力系数
      const jumpSpeed = this.jumpSpeed * 1 // 跳的高度
      // 玩家的更新
      Player.prototype.update = function (time, state, keys) {
        let xSpeed = 0
        if (keys.ArrowLeft) xSpeed -= playerXSpeed
        if (keys.ArrowRight) xSpeed += playerXSpeed
        let pos = this.pos
        const movedX = pos.plus(new Vec(xSpeed * time, 0))
        if (!state.level.touches(movedX, this.size, 'wall')) {
          pos = movedX
        }

        let ySpeed = this.speed.y + time * gravity
        const movedY = pos.plus(new Vec(0, ySpeed * time))
        if (!state.level.touches(movedY, this.size, 'wall')) {
          pos = movedY
        } else if (keys.ArrowUp && ySpeed > 0) {
          ySpeed = -jumpSpeed
        } else {
          ySpeed = 0
        }
        return new Player(pos, new Vec(xSpeed, ySpeed))
      }
    },
    async runGame(plans, Display) {
      let level = this.selectedLevel.value
      while (level < plans.length) {
        const status = await this.runLevel(new Level(plans[level]), Display)
        if (status === 'won') ++level
      }
    },
    // 定义函数入口
    runLevel(level, Display) {
      const display = new Display(document.querySelector('.background'), level)
      let state = State.start(level)
      let ending = 1
      // 设置按键
      this.arrowKeys = this.trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])
      return new Promise((resolve) => {
        this.runAnimation((time) => {
          state = state.update(time, this.arrowKeys)
          display.syncState(state)
          if (state.status === 'playing') {
            if (this.stop) {
              display.clear()
              return false
            }
            return true
          } else if (ending > 0) {
            ending -= time
            return true
          } else {
            display.clear()
            resolve(state.status)
            return false
          }
        })
      })
    },
    runAnimation(frameFunc) {
      let lastTime = null
      function frame(time) {
        if (lastTime != null) {
          const timeStep = Math.min(time - lastTime, 100) / 1000
          if (frameFunc(timeStep) === false) return
        }
        lastTime = time
        // 代替定时器做流畅动画，类似定时器，传入一个回调函数
        requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    },
    // 跟踪按键
    trackKeys(keys) {
      const down = Object.create(null)
      function track(event) {
        if (keys.includes(event.key)) {
          down[event.key] = event.type === 'keydown'
          event.preventDefault()
        }
      }
      window.addEventListener('keydown', track)
      window.addEventListener('keyup', track)
      return down
    }
  }
}
</script>

<style lang="scss">
h3{
  color: #666;
  width: 250px;
  word-break: break-all;
  position: fixed;
  left: 5%;
  margin-top: 80px;
}
.background {
  width: 100%;
  height: calc(100vh);
  position: fixed;
  background: #222;

  .panel{
    width: 500px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-content: center;
    .panel-item{
      margin: 15px auto;
      display: flex;
      align-items: center;
    }
  }
  .exit{
    position:fixed;
    left: 50px;
    top: 80px;
    z-index: 99;
  }
}
.map-table {
  table-layout: fixed;
  border-spacing: 0;
}
.game {
  position: absolute;
  overflow: hidden;
  z-index: 1;
  top: 120px;
}
.background td {
  padding: 0;
}

.lava {
  background: #e55;
}

.wall {
  background: #444;
  border: solid 3px #333;
  box-sizing: content-box;
}

.actor {
  position: absolute;
}

.coin {
  background: #e2e838;
  border-radius: 50%;
}

.player {
  background: #335699;
  box-shadow: none;
}

.lost .player {
  background: #a04040;
}

.won .player {
  background: green;
}
</style>
