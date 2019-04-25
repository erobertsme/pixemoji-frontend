import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Canvas from '../Canvas';

export default class Draw extends Component {
  state = {
    scale: 4,
    size: 128,
    color: "#ff0000",
    pixels: [
      {x: 10, y: 10, color: "#ff0000"},
      {x: 20, y: 20, color: "#ff0000"},
      {x: 30, y: 30, color: "#ff0000"},
      {x: 40, y: 40, color: "#ff0000"},
      {x: 50, y: 50, color: "#ff0000"},
      {x: 60, y: 60, color: "#ff0000"},
    ]
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);

    canvas.addEventListener('onmousedown', () => {

    })
  }

  handleEvent = (ev) => {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const rect = canvas.getBoundingClientRect()
    const [cX, cY] = [Math.floor(rect.left), Math.floor(rect.top)]
    const [mX, mY] = [ev.clientX, ev.clientY]
    const [absX, absY] = [(mX - cX), (mY - cY)]
    const newPixel = {x: absX, y: absY, color: this.state.color}
    this.setState({pixels: [...this.state.pixels, newPixel]})
  }

  changeSize = () => {
    let newSize
    if (this.state.size === 64) {
      newSize = 128
    } else {
      newSize = 64
    }
    this.setState({size: newSize})
  }
  
  render() {
    return (
    <Grid
      item={true}
    >
      <Canvas 
        ref="canvas" 
        scale={this.state.scale} 
        size={(this.state.size*this.state.scale)} 
        pixels={this.state.pixels} 
        handleEvent={this.handleEvent}
      />
    </Grid>
    )
  }
}
