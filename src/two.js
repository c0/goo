const BLOB_COLOR = '#000'
const DECAY = 0.005
const VELOCITY = 1 // >= 1

class Ball {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.angle = Math.PI * 2 * Math.random()
    this.vx = (VELOCITY + Math.random() * (1 - VELOCITY)) * Math.cos(this.angle)
    this.vy = VELOCITY + Math.random() * (1 - VELOCITY)
    this.r = 12 + 3 * Math.random()
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

const GOOP_Y_OFFSET = 50

class GoopLine {
  constructor(y, thickness, droop) {
    this.ly = y + GOOP_Y_OFFSET * Math.random() - GOOP_Y_OFFSET
    this.ry = y + GOOP_Y_OFFSET * Math.random() - GOOP_Y_OFFSET

    this.thickness = thickness
    this.droop = droop
    this.r = width
  }

  update(lp, rp, percentage) {
    const mp = {
      x: (lp.x + rp.x) / 2,
      y: Math.max(
        (this.ly + this.ry) / 2,
        (this.ly + this.ry) / 2 + (1 - percentage) * this.droop - GOOP_Y_OFFSET
      ),
    }
    const t = this.thickness
    ctx.beginPath()
    ctx.moveTo(lp.x, this.ly)
    ctx.arcTo(mp.x, mp.y, rp.x, this.ry, this.r * (1 - percentage))
    ctx.lineTo(rp.x, this.ry) // Finishes the line
    ctx.lineTo(rp.x, this.ry + t)

    ctx.arcTo(
      mp.x,
      mp.y + t,
      lp.x,
      this.ly + t,
      this.r * 1.25 * (1 - percentage)
    )

    ctx.lineTo(lp.x, this.ly + t)
    ctx.fill()
    ctx.stroke()
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
const GOOP_LINE_COUNT = Math.floor(height / 150)

for (let i = 0; i < GOOP_LINE_COUNT; i++) {
  goopLines.push(
    new GoopLine(
      i * (height / GOOP_LINE_COUNT) + (50 * Math.random() - 50),
      randBetween(30, 50),
      randBetween(100, 300)
    )
  )
}
let ballMakerSpeed = 10
const BALL_MAKER_EDGE = 50

function loop() {
  ctx.clearRect(0, 0, width, height)

  const halfPercentage = (1 - mouse.y / height) / 2

  goopLines.forEach((goopLine) => {
    goopLine.update(
      { x: width * halfPercentage },
      { x: width * (1 - halfPercentage) },
      halfPercentage * 2
    )
  })

  // Side Walls
  ctx.fillRect(0, 0, width * halfPercentage + 30, height)
  ctx.fillRect(
    width * (1 - halfPercentage) - 30,
    0,
    width * halfPercentage + 30,
    height
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

  // Move ball 15% toward the mouse on each frame
  // origin.x += (mouse.x - origin.x) * 0.15
  // origin.y += (mouse.y - origin.y) * 0.15

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

  // Draw the main mouse ball
  ctx.fillStyle = BLOB_COLOR
  ctx.beginPath()
  ctx.arc(origin.x, origin.y, 15, 0, Math.PI * 2, false)
  ctx.fill()

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
