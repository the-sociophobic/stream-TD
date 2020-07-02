import React, { Component } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import isTouchDevice from 'utils/isTouchDevice'


export default class Header extends Component {
  constructor(props) {
    super(props)

    this.pos = {
      x: undefined,
      y: undefined,
    }
    this.pressed = false

    this.canvasRef = React.createRef()

    if (isTouchDevice()) {
      document.addEventListener('touchmove', e => this.drawTouch(e))
      document.addEventListener('touchstart', e => { this.pressed = true; this.setPosTouch(e) })
      document.addEventListener('touchend', e => { this.pressed = false; this.setPosTouch(e) })
    } else {
      document.addEventListener('mousemove', e => this.draw(e))
      document.addEventListener('mousedown', e => this.setPos(e))
      document.addEventListener('mouseenter', e => this.setPos(e))
    }
  }

  componentDidMount = () => {
    this.resizeObserver = new ResizeObserver(() => this.resize())
      .observe(this.canvasRef.current)
    
    this.resize()
  }

  resize = () => {
    const ctx = this.getCtx()

    if (ctx) {
      ctx.canvas.width = this.canvasRef.current.clientWidth
      ctx.canvas.height = this.canvasRef.current.clientHeight
    }
  }

  getCtx = () => 
    this.canvasRef.current &&
      this.canvasRef.current.getContext('2d')

  setPos = e =>
    this.pos = {
      x: e.clientX,
      y: e.clientY
    }

  setPosTouch = e => {
    const touch = e.changedTouches && e.changedTouches[0]

    if (touch)
      this.pos = {
        x: touch.pageX,
        y: touch.pageY
      }
  }

  draw = e => {
    const ctx = this.getCtx()

    if (!ctx || typeof this.pos.x === "undefined" || e.buttons !== 1)
      return

    ctx.beginPath()
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#ee0200'

    ctx.moveTo(this.pos.x, this.pos.y)
    this.setPos(e)
    ctx.lineTo(this.pos.x, this.pos.y)

    ctx.stroke()
  }

  drawTouch = e => {
    const ctx = this.getCtx()

    if (!ctx || typeof this.pos.x === "undefined" || !this.pressed)
      return

    ctx.beginPath()
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#ee0200'

    ctx.moveTo(this.pos.x, this.pos.y)
    this.setPosTouch(e)
    ctx.lineTo(this.pos.x, this.pos.y)

    ctx.stroke()
  }
    

  render = () =>
    <div className="canvas">
      <canvas ref={this.canvasRef} />
    </div>
}
