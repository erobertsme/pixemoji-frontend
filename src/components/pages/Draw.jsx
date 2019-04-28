import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Canvas from '../Canvas';
import Preview from '../Preview';
// import ColorSelector from ''

export default class Draw extends Component {
  state = {
    scale: 10,
    size: 64,
    color: "#FF0000",
    isDrawing: false,
    grid: {
      on: true,
      color: "rgba(0,0,0,0.1)"
    },
    pixels: []
  }

  toggleDrawing = (bool) => {
    this.setState({isDrawing: bool})
  }

  handleEvent = (ev) => {
    // console.log(ev)
    // Thanks Allen! @allen-woods
    const scale = this.state.scale
    const rect = ev.target.getBoundingClientRect()
    const [mouseX, mouseY] = [Math.floor(ev.clientX - rect.left), Math.floor(ev.clientY - rect.top)]
    const [cellX, cellY] = [(Math.floor(mouseX / scale) * scale), (Math.floor(mouseY / scale) * scale)]

    // console.log('w,h', w, h)
    // console.log('mouseX,mouseY', mouseX, mouseY)
    // console.log('cellX,cellY', cellX, cellY)

    const newPixel = {x: cellX, y: cellY, color: this.state.color}

    if (this.checkDuplicate(newPixel)) {
      return
    }

    if (this.state.isDrawing) {
      this.captureSkip()
    }
    
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

  checkDuplicate = (newPixel) => {
    const result = this.state.pixels.some(pixel => {
      return (pixel.x === newPixel.x && pixel.y === newPixel.y && pixel.color === newPixel.color)
    })
    return result
  }

  captureSkip = () => {
    const [secondLast, last] = this.state.pixels.slice(-2)
    console.log("2nd last", secondLast, "Last", last)
  }
  
  render() {
    return (
    <Grid item={true}>
      <Preview ref="preview" pixels={this.state.pixels} size={this.state.size} />
      <Canvas 
        ref="canvas" 
        scale={this.state.scale} 
        size={(this.state.size*this.state.scale)} 
        pixels={this.state.pixels} 
        handleEvent={this.handleEvent}
        toggleDrawing={this.toggleDrawing}
        isDrawing={this.state.isDrawing}
        grid={this.state.grid}
      />
    </Grid>
    )
  }
}
