const BLOB_COLOR = '#000'
const DECAY = 0.005
const VELOCITY = 1 // >= 1

class Ball {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.angle = Math.PI * 2 * Math.random()
    this.vx =
      (VELOCITY / 4 + Math.random() * (1 - VELOCITY)) * Math.cos(this.angle)
    this.vy = VELOCITY + Math.random() * (1 - VELOCITY)
    this.r = 16 + 5 * Math.random()
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.r -= DECAY
  }
}

const randBetween = (low, high) => {
  return Math.random() * (high - low) + low
}

const GOOP_X_OFFSET = 50

class GoopLine {
  constructor(x, thickness) {
    this.lx = x + GOOP_X_OFFSET * Math.random() - GOOP_X_OFFSET
    this.rx = x + GOOP_X_OFFSET * Math.random() - GOOP_X_OFFSET

    this.thickness = thickness
    this.r = width
  }

  update(lp, rp, percentage) {
    const t = this.thickness
    ctx.beginPath()
    ctx.moveTo(this.lx, lp.y)
    ctx.lineTo(this.rx, rp.y) // Finishes the line
    ctx.lineTo(this.rx + t, rp.y)
    ctx.lineTo(this.lx + t, lp.y)
    ctx.fill()
  }
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// State
let width = (canvas.width = window.innerWidth)
let height = (canvas.height = window.innerHeight)
let origin = { x: width / 2, y: height / 2 }
let mouse = { x: width / 2, y: height / 2 }
let balls = []
let count = 0
let randomCount = 1

let goopLines = []
const GOOP_LINE_COUNT = Math.floor(width / 100)

for (let i = 0; i < GOOP_LINE_COUNT; i++) {
  goopLines.push(
    new GoopLine(
      i * (width / GOOP_LINE_COUNT) + (50 * Math.random() - 50),
      randBetween(5, 50)
    )
  )
}
let ballMakerSpeed = 50
const BALL_MAKER_EDGE = 50

function loop() {
  ctx.clearRect(0, 0, width, height)

  const halfPercentage = (1 - mouse.y / height) / 2

  goopLines.forEach((goopLine) => {
    goopLine.update(
      { y: height * halfPercentage },
      { y: height * (1 - halfPercentage) },
      halfPercentage * 2
    )
  })

  // Side Walls
  ctx.fillRect(0, 0, width, height * halfPercentage + 30)
  ctx.fillRect(
    0,
    height * (1 - halfPercentage) - 30,
    width,
    height * halfPercentage + 30
  )

  // Create a new ball
  if (count === randomCount) {
    balls.push(new Ball(origin.x, origin.y))
    count = 0
    randomCount = 3 + Math.floor(Math.random() * 5)
  }
  count++

  // Draw each ball
  for (var i = 0; i < balls.length; i++) {
    var b = balls[i]
    ctx.fillStyle = BLOB_COLOR
    ctx.beginPath()
    var br = b.r >= 0 ? b.r : 0
    ctx.arc(b.x, b.y, br, 0, Math.PI * 2, false)
    ctx.fill()
    b.update()
  }

  // Move the ball maker back and forth
  origin.y = -10
  origin.x += ballMakerSpeed

  if (origin.x > width - BALL_MAKER_EDGE) {
    origin.x = width - BALL_MAKER_EDGE
    ballMakerSpeed *= -1
  } else if (origin.x < BALL_MAKER_EDGE) {
    origin.x = BALL_MAKER_EDGE
    ballMakerSpeed *= -1
  }

  maybeRemoveBall()
  requestAnimationFrame(loop)
}

function maybeRemoveBall() {
  for (var i = 0; i < balls.length; i++) {
    var b = balls[i]
    if (
      b.x + b.r < 0 ||
      b.x - b.r > width ||
      b.y + b.r < 0 ||
      b.y - b.r > height ||
      b.r <= 0
    ) {
      balls.splice(i, 1)
    }
  }
}

loop()

window.onresize = () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  origin = { x: width / 2, y: height / 2 }
}

window.addEventListener(
  'mousemove',
  function (e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  },
  false
)
