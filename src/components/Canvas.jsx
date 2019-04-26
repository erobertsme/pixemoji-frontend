import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Canvas extends Component {

  componentDidMount = () => {
    this.draw()
    this.drawGrid()
  }

  componentDidUpdate = () => {
    this.draw()
  }

  draw = () => {
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext('2d');

    this.props.pixels.forEach(pixel => {
      ctx.fillStyle = pixel.color;
      ctx.fillRect(pixel.x, pixel.y, this.props.scale, this.props.scale);
    })
  }

  drawGrid = () => {
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
  
  render() {
    return (<canvas ref="canvas" height={this.props.size} width={this.props.size} onMouseDown={this.props.handleEvent} ></canvas>)
  }
}