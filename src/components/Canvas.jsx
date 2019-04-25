import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Canvas extends Component {

  componentDidMount = () => {
    this.draw()
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
  
  render() {
    return (<canvas ref="canvas" height={this.props.size} width={this.props.size} onMouseDown={this.props.handleEvent} ></canvas>)
  }
}