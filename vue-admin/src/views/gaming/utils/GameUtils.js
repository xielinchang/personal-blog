
// 绘制地图
export function elt(name, attrs, ...children) {
  const dom = document.createElement(name)
  for (const attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr])
  }
  for (const child of children) {
    dom.appendChild(child)
  }
  return dom
}

// 地图大小
export const scale = 6
// 绘制地图
export function drawGrid(level) {

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
export function drawActors(actors) {
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
export function runAnimation(frameFunc) {
  let lastTime = null
  function frame(time) {
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000
      if (frameFunc(timeStep) === false) return
    }
    lastTime = time
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export function trackKeys(keys) {
  const down = Object.create(null)
  const pressed = Object.create(null)
  const lastPressed = Object.create(null) // 新增：记录上次按键状态

  function track(event) {
    if (keys.includes(event.key)) {
      const wasDown = down[event.key]
      down[event.key] = event.type === 'keydown'

      // 只有在按键从释放到按下时才标记为已按下
      if (!wasDown && down[event.key]) {
        pressed[event.key] = true
        lastPressed[event.key] = Date.now() // 记录按下时间
      }

      if (!["INPUT", "TEXTAREA"].includes(event.target.tagName)) {
        event.preventDefault();
      }


    }
  }

  window.addEventListener('keydown', track)
  window.addEventListener('keyup', track)

  return {
    isDown: key => down[key],
    wasPressed: key => {
      if (pressed[key]) {
        pressed[key] = false
        return true
      }
      return false
    },
    remove: () => {
      window.removeEventListener('keydown', track)
      window.removeEventListener('keyup', track)
    },
    getPressDuration: key => down[key] ? Date.now() - (lastPressed[key] || 0) : 0
  }
}

