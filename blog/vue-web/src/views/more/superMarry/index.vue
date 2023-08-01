<template>
  <div class="background"></div>
</template>

<script>
import { maps } from "./map";
//定义玛丽
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}
//读取关卡
class Level {
  constructor(plan) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type == "string") return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
    // console.log(this.startActors);
  }
}

//持久化的数据
class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find((a) => a.type === "player");
  }
}
//定义玩家
class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

//熔岩
class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos, ch) {
    if (ch === "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch === "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch === "v") {
      return new Lava(pos, new Vec(0, 3, pos));
    }
  }
}
Lava.prototype.size = new Vec(1, 1);

//金币
class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}
//把地图抽象成代码
const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
};
Coin.prototype.size = new Vec(0.6, 0.6);
//绘制地图
function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

const scale = 16;

function drawGrid(level) {
  return elt(
    "table",
    {
      class: "map-table",
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) =>
      elt(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map((type) => elt("td", { class: type }))
      )
    )
  );
}
//绘制玛丽
function drawActors(actors) {
  return elt(
    "div",
    {},
    ...actors.map((actor) => {
      let rect = elt("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}
//绘制新状态把旧的状态删除
DOMDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

//判断运动和碰撞
DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft,
    right = left + width;
  let top = this.dom.scrollTop,
    bottom = top + height;

  let player = state.player;
  // console.log(state);
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

DOMDisplay.prototype.syncState = function (state) {
  // ...
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

//判断碰到岩浆就取消动作
Level.prototype.touches = function (pos, size, type) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};

//判断是否碰到了岩浆
State.prototype.update = function (time, keys) {
  let actors = this.actors.map((actor) => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != "playing") return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};
// 判断二者是否重叠
function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

//判断碰到岩浆输 或者吃完金币获胜
Lava.prototype.collide = function (state) {
  return new State(state.level, state.actors, "lost");
};

Coin.prototype.collide = function (state) {
  let filtered = state.actors.filter((a) => a != this);
  let status = state.status;
  if (!filtered.some((a) => a.type == "coin")) status = "won";
  return new State(state.level, filtered, status);
};

// //金币的更新
const wobbleSpeed = 8, // 金币抖动速度
  wobbleDist = 0.1; // 金币抖动幅度

Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  );
};

//岩浆的更新
Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};

//玩家的更新
const playerXSpeed = 15; // 速度
const gravity = 30; // 重力系数
const jumpSpeed = 18; // 跳的高度

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};

export default {
  name: "superMarry",
  data() {
    return {
      arrowKeys: {},
      playerXSpeed: 12, // 速度
      gravity: 30, // 重力系数
      jumpSpeed: 18, // 跳的高度
    };
  },
  mounted() {
    this.runGame(maps, DOMDisplay);
  },
  methods: {
    async runGame(plans, Display) {
      for (let level = 0; level < plans.length; ) {
        let status = await this.runLevel(new Level(plans[level]), Display);
        if (status == "won") level++;
      }
      console.log("You've won!");
    },
    // 定义函数入口
    runLevel(level, Display) {
      let display = new Display(document.body, level);
      let state = State.start(level);
      let ending = 1;
      // 设置按键
      this.arrowKeys = this.trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
      return new Promise((resolve) => {
        this.runAnimation((time) => {
          state = state.update(time, this.arrowKeys);
          display.syncState(state);
          if (state.status == "playing") {
            return true;
          } else if (ending > 0) {
            ending -= time;
            return true;
          } else {
            display.clear();
            resolve(state.status);
            return false;
          }
        });
      });
    },
    runAnimation(frameFunc) {
      let lastTime = null;
      function frame(time) {
        if (lastTime != null) {
          let timeStep = Math.min(time - lastTime, 100) / 1000;
          if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    },
    //跟踪按键
    trackKeys(keys) {
      let down = Object.create(null);
      function track(event) {
        if (keys.includes(event.key)) {
          down[event.key] = event.type == "keydown";
          event.preventDefault();
        }
      }
      window.addEventListener("keydown", track);
      window.addEventListener("keyup", track);
      return down;
    },
  },
};
</script>

<style lang="scss">
.background {
  width: 100%;
  height: calc(100vh);
  position: fixed;
  background: #222;
}
.map-table {
  table-layout: fixed;
  border-spacing: 0;
}
.game {
  position: absolute;
  overflow: hidden;
  margin-top: 100px;
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
