import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Canvas from '../Canvas';
import Preview from '../Preview';
import { Undo, Redo } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import { SketchPicker } from 'react-color';
// import ColorSelector from ''

export default class Draw extends Component {
  state = {
    scale: 10,
    size: 64,
    color: 'rgba(255,0,0,1)',
    backgroundColor: '',
    isDrawing: false,
    grid: {
      on: true,
      color: 'rgba(0,0,0,0.1)'
    },
    pixels: [],
    redo: []
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

    if (this.state.isDrawing && this.state.pixels.length > 0) {
      let lastPixel = this.state.pixels[this.state.pixels.length-1][this.state.pixels[this.state.pixels.length-1].length-1]
      this.detectSkip(lastPixel, newPixel)
      this.state.pixels[this.state.pixels.length-1].push(newPixel)
      this.setState({pixels: [...this.state.pixels]})
    } else {
      this.setState({pixels: [...this.state.pixels, [newPixel]]})
    }

    this.setState({redo: []})
    
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

  changeScale = (newScale) => {
    const prevScale = this.state.scale
    this.state.pixels.map(pixelGroup => {
      return pixelGroup.map(pixel => {
        return {
          x: (pixel.x / prevScale) * newScale, 
          y: (pixel.y / prevScale) * newScale, 
          color: pixel.color
        }
      })
    })
  }

  checkDuplicate = (newPixel) => {
    const result = this.state.pixels.map(pixelGroup => {
      return pixelGroup.some(pixel => {
        return (pixel.x === newPixel.x && pixel.y === newPixel.y && pixel.color === newPixel.color)
      })
    })
    return result.some(i => i === true)
  }

  detectSkip = (lastPixel, newPixel) => {
    
    const deltaY = lastPixel.y - newPixel.y
    const deltaX = lastPixel.x - newPixel.x

    
    if (Math.max(Math.abs(deltaY), Math.abs(deltaX)) > this.state.scale) {
      if (Math.abs(deltaY) > this.state.scale && Math.abs(deltaX) > this.state.scale) {
        
        let skippedPixel = {x: 0, y: 0, color: this.state.color}
        for (let i = 0; i < lastPixel.x; i++) {
          
        }
      } else if (Math.abs(deltaY)) {

      } else if (Math.abs(deltaX)) {

      }
      console.log(deltaY, deltaX)
    }
    
    // const [lastX, newX] = [lastPixel.x, newPixel.x]
    // const [lastY, newY] = [lastPixel.y, newPixel.y]

    // const diffX = Math.abs(lastX - newX) / this.state.scale
    // const diffY = Math.abs(lastY - newY) / this.state.scale
    
    // if (diffX && diffY && (diffX > 1 || diffY > 1)) {
    //   console.log('Skip detected!', lastPixel, newPixel)
    //   console.log(`(${lastPixel.y} - ${newPixel.y}) / (${lastPixel.x} - ${newPixel.x})`)
    //   console.log('Slope: ', (lastPixel.y - newPixel.y) / (lastPixel.x - newPixel.x))
    // } 
  }

  undo = () => {
    if (this.state.pixels.length > 0) {
      const removed = this.state.pixels.splice(-1)
      this.setState({redo: [...this.state.redo, removed[0]]})
    }
  }

  redo = () => {
    if (this.state.redo.length > 0) {
      const readded = this.state.redo.splice(-1)
      this.setState({pixels: [...this.state.pixels, readded[0]]})
    }
  }

  handleColorPick = (ev) => {
    this.setState({color: `rgba${ev.rgb.r}`})
  }

  save = () => {
    let canvas = ReactDOM.findDOMNode(this.refs.preview);
    let base64 = canvas.toDataURL();
    var link = document.createElement("a");

    link.setAttribute('href', base64);
    link.setAttribute('download', 'pixemoji.png');
    link.click();
  }
  
  render() {
    return (
    <Grid item={true}>
      {/* <SketchPicker onChange={this.handleColorPick} /> */}
      <Preview 
        ref="preview" 
        pixels={this.state.pixels} 
        size={this.state.size} 
        scale={this.state.scale} 
      />
      <Button onClick={this.undo}><Undo /></Button>
      <Button onClick={this.redo}><Redo /></Button>
      <Button variant="contained" color="primary" onClick={this.save}>Save</Button>
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
