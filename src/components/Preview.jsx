import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Preview extends Component {

  componentWillReceiveProps(props) {
    this.draw()
  }

  componentDidMount = () => {
    this.draw()
  }

  componentDidUpdate = () => {
    this.draw()
  }

  draw = () => {
    this.clearCanvas()
    let canvas = ReactDOM.findDOMNode(this.refs.preview);
    let ctx = canvas.getContext('2d');

    this.props.pixels.forEach(pixel => {
      ctx.fillStyle = pixel.color;
      ctx.fillRect(pixel.x, pixel.y, this.props.scale+1, this.props.scale+1);
    })
  }

  clearCanvas = () => {
    let canvas = ReactDOM.findDOMNode(this.refs.preview);
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
    <canvas 
      ref="preview" 
      height={this.props.size} 
      width={this.props.size} 
    ></canvas>)
  }
}