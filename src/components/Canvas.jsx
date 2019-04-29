import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Canvas extends Component {

  componentDidMount = () => {
    this.draw()
    this.drawGrid()
  }

  componentDidUpdate = () => {
    this.draw()
    this.drawGrid()
  }

  draw = () => {
    this.clearCanvas()
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext('2d');

    this.props.pixels.forEach(pixelGroup => {
      pixelGroup.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x, pixel.y, this.props.scale+1, this.props.scale+1);
      })
    })
  }

  drawGrid = () => {
    if (this.props.grid && !this.props.grid.on) {
      this.clearCanvas()
      this.draw()
      return
    }
    const lines = (this.props.size/this.props.scale)
    for (let i = 1; i < lines; i++) {
      let canvas = ReactDOM.findDOMNode(this.refs.canvas);
      let ctx = canvas.getContext('2d');
      let linePos = (this.props.scale*i)

      ctx.strokeStyle = this.props.grid.color;
      
      ctx.beginPath();
      ctx.moveTo(linePos+0.5, 0);
      ctx.lineTo(linePos+0.5, canvas.height)
      ctx.closePath();
      ctx.fill();
      ctx.stroke()

      ctx.beginPath();
      ctx.moveTo(0, linePos+0.5);
      ctx.lineTo(canvas.width, linePos+0.5)
      ctx.closePath();
      ctx.fill();
      ctx.stroke()
    }
  }

  handleMouseDown = (ev) => {
    this.props.handleEvent(ev)
    this.props.toggleDrawing(true)
  }

  handleMouseUp = () => {
    this.props.toggleDrawing(false)
  }

  handleMouseMove = (ev) => {
    if (this.props.isDrawing) {
      this.props.handleEvent(ev)
    }
  }

  handleMouseLeave = () => {
    this.props.toggleDrawing(false)
  }

  clearCanvas = () => {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  render() {
    return (
    <canvas 
      ref="canvas" 
      height={this.props.size} 
      width={this.props.size} 
      onMouseDown={this.handleMouseDown} 
      onMouseUp={this.handleMouseUp} 
      onMouseMove={this.handleMouseMove}
      onMouseLeave={this.handleMouseLeave}
    ></canvas>)
  }
}