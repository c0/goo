const BLOB_COLOR = '#000'
const DECAY = 0.1
const VELOCITY = 1 // >= 1

const LINKS = 3

class Ball {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.angle = Math.PI * 2 * Math.random()
    this.vx = (VELOCITY + Math.random() * (1 - VELOCITY)) * Math.cos(this.angle)
    this.vy = (VELOCITY + Math.random() * (1 - VELOCITY)) * Math.sin(this.angle)
    this.r = 12 + 3 * Math.random()
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.r -= DECAY
  }
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// State
let width = (canvas.width = window.innerWidth)
let height = (canvas.height = window.innerHeight)
let gap = width / (LINKS + 1)
let origin = { x: width / 2, y: height / 2 }
let mouse = { x: width / 2, y: height / 2 }
let balls = []
let count = 0
let randomCount = 5

function loop() {
  ctx.clearRect(0, 0, width, height)
  ctx.font = '25px Arial'

  //Set the color of the text. This can be
  //an RGB color or a textual description
  //such as red.
  ctx.fillStyle = '0,0,0'

  for (let j = 0; j < LINKS; j++) {
    ctx.fillStyle = BLOB_COLOR
    ctx.beginPath()
    ctx.arc(gap * (j + 1), origin.y, 40, 0, Math.PI * 2, false)
    ctx.fill()

    // Create a new ball?
    if (count === randomCount) {
      balls.push(new Ball(gap * (j + 1), origin.y))
      count = 0
      randomCount = 3 + Math.floor(Math.random() * 5)
    }
    count++
  }

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

  maybeRemoveBall()
  requestAnimationFrame(loop)
}

function maybeRemoveBall() {
  for (var i = 0; i < balls.length; i++) {
    const b = balls[i]
    if (
      b.x + b.r < 0 ||
      b.x - b.r > width ||
      b.y + b.r < 0 ||
      b.y - b.r > height ||
      b.r <= 0
    ) {
      delete balls[i]
      balls.splice(i, 1)
    }
  }
}

loop()

window.onresize = () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  origin = { x: width / 2, y: height / 2 }
  gap = width / (LINKS + 1)
}
