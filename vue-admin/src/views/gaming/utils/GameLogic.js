import { elt, scale, drawGrid, drawActors } from './GameUtils'

// 判断二者是否重叠
function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  )
}
const wobbleSpeed = 8 // 金币抖动速度
const wobbleDist = 0.1 // 金币抖动幅度
export class Vec {
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
export class Player {
  constructor(pos, speed, jumpCount = 0, onGround = false, isInvincible = true) {
    this.pos = pos
    this.speed = speed
    this.jumpCount = jumpCount
    this.onGround = onGround
    this.isInvincible = isInvincible
  }

  get type() {
    return 'player'
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0))
  }
}

export class Lava {
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
    } else if (ch === '-') {
      return new Lava(pos, new Vec(5, 0))
    } else if (ch === '|') {
      return new Lava(pos, new Vec(0, 2))
    } else if (ch === 'v') {
      return new Lava(pos, new Vec(0, 3))
    }
  }
  update(time, state) {
    const newPos = this.pos.plus(this.speed.times(time))
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Lava(newPos, this.speed, this.reset)
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset)
    } else {
      return new Lava(this.pos, this.speed.times(-1))
    }
  }

  collide(state) {
    if (state.player.isInvincible) {
      return new State(this.level, actors, this.status)
    }

  }
}
export class Coin {
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
  update(time) {
    const wobble = this.wobble + time * wobbleSpeed
    const wobblePos = Math.sin(wobble) * wobbleDist
    return new Coin(
      this.basePos.plus(new Vec(0, wobblePos)),
      this.basePos,
      wobble
    )
  }
  collide(state) {
    const filtered = state.actors.filter((a) => a !== this)
    let status = state.status
    if (!filtered.some((a) => a.type === 'coin')) status = 'won'
    return new State(state.level, filtered, status)
  }
}
export class Spring {
  constructor(pos, bounceHeight = 1) {
    this.pos = pos
    this.bounceHeight = bounceHeight
    this.size = new Vec(1, 0.5)  // 弹簧的尺寸
  }

  get type() {
    return 'spring'
  }

  static create(pos) {
    return new Spring(pos, 40)  // 默认弹跳高度为1
  }
  update(time) {
    // 弹簧是静态的，不需要更新位置，直接返回自身
    return this
  }
  // 当玩家碰到弹簧时触发弹跳
  collide(state) {
    const player = state.player
    // 给玩家一个向上的速度，速度大小由弹跳高度决定
    player.speed.y = -Math.sqrt(2 * 15 * this.bounceHeight)  // 15是重力加速度
    player.onGround = false
    player.jumpCount = 0
    return state
  }
}
// 把地图抽象成代码
const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  o: Coin,
  '=': Lava,
  '-': Lava,
  '|': Lava,
  v: Lava,
  'u': Spring
}
export class Level {
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
        this.startActors?.push(type?.create(new Vec(x, y), ch))
        return 'empty'
      })
    })
  }
  // 判断碰到岩浆就取消动作
  touches(pos, size, type) {
    var xStart = Math.floor(pos.x)
    var xEnd = Math.ceil(pos.x + size.x)
    var yStart = Math.floor(pos.y)
    var yEnd = Math.ceil(pos.y + size.y)

    for (var y = yStart; y < yEnd; y++) {
      for (var x = xStart; x < xEnd; x++) {
        const isOutside =
          x < 0 || x >= this.width || y < 0 || y >= this.height
        const here = isOutside ? 'wall' : this.rows[y][x]
        if (here === type) return true
      }
    }
    return false
  }
}
export class State {
  constructor(level, actors, status) {
    this.level = level
    this.actors = actors
    this.status = status
  }

  static start(level) {
    return new State(level, level.startActors, 'playing')
  }

  get player() {
    return this.actors.find((a) => a?.type === 'player')
  }
  // 状态更新(判断是否碰到了岩浆)
  update(time, keys) {
    // 这边actor的update方法即Lava，Coin，Player等原型的update
    const actors = this.actors.map((actor) => actor?.update(time, this, keys))
    let newState = new State(this.level, actors, this.status)

    if (newState.status !== 'playing') return newState

    const player = newState.player
    if (this.level.touches(player.pos, player.size, 'lava')) {
      return new State(this.level, actors, this.status)
    }

    for (const actor of actors) {
      if (actor !== player && overlap(actor, player)) {
        newState = actor.collide(newState)
      }
    }
    return newState
  }
}

export class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level))
    this.actorLayer = null
    parent.appendChild(this.dom)
  }

  // 清除DOM
  clear() {
    this.dom.remove()
  }
  // 绘制新状态把旧的状态删除
  syncState(state) {
    if (this.actorLayer) this.actorLayer.remove()
    this.actorLayer = drawActors(state.actors)
    this.dom.appendChild(this.actorLayer)
    this.dom.className = `game ${state.status}`
    this.scrollPlayerIntoView(state)
  }

  // 判断运动和碰撞

  scrollPlayerIntoView(state) {
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
}

