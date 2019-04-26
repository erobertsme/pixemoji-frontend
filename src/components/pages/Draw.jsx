import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Canvas from '../Canvas';

export default class Draw extends Component {
  state = {
    scale: 12,
    size: 128,
    color: "#FF0000",
    grid: {
      toggle: true,
      color: "#999"
    },
    pixels: []
  }

  handleEvent = (ev) => {
    // Thanks Allen! @allen-woods
    const rect = ev.target.getBoundingClientRect()
    const [w, h] = [(rect.right - rect.left), (rect.bottom - rect.top)]
    const [cellW, cellH]  = [Math.floor(w / this.state.size), Math.floor(h / this.state.size)]
    const [deltaX, deltaY] = [(ev.clientX - rect.left), (ev.clientY - rect.top)]
    const [absX, absY] = [(Math.floor(deltaX / cellW) * cellW), (Math.floor(deltaY / cellH) * cellH)]

    const newPixel = {x: absX + 0.5, y: absY + 0.5, color: this.state.color}
    
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
    <Grid item={true}>
      <Canvas pixels={this.state.pixels} size={this.state.size} />
      <Canvas 
        ref="canvas" 
        scale={this.state.scale} 
        size={(this.state.size*this.state.scale)} 
        pixels={this.state.pixels} 
        handleEvent={this.handleEvent}
        grid={this.state.grid}
      />
    </Grid>
    )
  }
}
