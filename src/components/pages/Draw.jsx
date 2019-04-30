import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Canvas from '../Canvas';
import Preview from '../Preview';
import { Undo, Redo, Clear, ZoomIn, ZoomOut, ColorLens } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import { SketchPicker } from 'react-color';
import Draggable from 'react-draggable';
// import ColorSelector from ''

export default class Draw extends Component {
  state = {
    scale: 10,
    size: 64,
    color: {r: 255, g: 0, b: 0, a: 1},
    backgroundColor: '',
    isDrawing: false,
    grid: {
      on: true,
      color: 'rgba(0,0,0,0.1)'
    },
    showColorPicker: false,
    pixels: [],
    redo: [],
    undo: [],
  }

  toggleDrawing = (bool) => {
    this.setState({isDrawing: bool})
  }

  handleEvent = (ev) => {
    // console.log(ev)
    // Thanks Allen! @allen-woods
    const scale = this.state.scale
    const rect = ev.target.getBoundingClientRect()
    const [mouseX, mouseY] = [Math.floor(ev.clientX - rect.left)-1, Math.floor(ev.clientY - rect.top)-1]
    const [cellX, cellY] = [Math.floor(mouseX / scale), Math.floor(mouseY / scale)]

    // console.log('w,h', w, h)
    // console.log('mouseX,mouseY', mouseX, mouseY)
    // console.log('cellX,cellY', cellX, cellY)

    const newPixel = {x: cellX, y: cellY, color: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a}`}

    if (this.checkDuplicate(newPixel)) {
      return
    }

    if (this.state.isDrawing && this.state.pixels.length > 0) {
      let lastPixel = this.state.pixels[this.state.pixels.length-1][this.state.pixels[this.state.pixels.length-1].length-1]
      this.detectSkip(lastPixel, newPixel)
      this.state.pixels[this.state.pixels.length-1].push(newPixel)
      this.setState({ pixels: [...this.state.pixels] })
    } else {
      this.setState({ pixels: [...this.state.pixels, [newPixel]] })
    }

    this.setState({ redo: [] })
    
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

  toggleColorPicker = () => {
    this.setState({ showColorPicker: !this.state.showColorPicker })
  }

  setScale = (int) => {
    this.setState({ scale: int })
  }

  increaseScale = () => {
    this.setState({ scale: this.state.scale+1 })
  }

  decreaseScale = () => {
    if (this.state.scale > 1) {
      this.setState({ scale: this.state.scale-1 })
    }
  }

  checkDuplicate = (newPixel) => {
    const result = this.state.pixels.flat().some(pixel => {
      return (pixel.x === newPixel.x && pixel.y === newPixel.y && pixel.color === newPixel.color)
    })
    return result
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
      this.setState({ redo: [...this.state.redo, removed[0]] })
    }
  }

  redo = () => {
    if (this.state.redo.length > 0) {
      const readded = this.state.redo.splice(-1)
      this.setState({ pixels: [...this.state.pixels, readded[0]] })
    }
  }

  handleColorPick = (ev) => {
    this.setState({ color: ev.rgb })
  }

  save = () => {
    let canvas = ReactDOM.findDOMNode(this.refs.preview);
    let base64 = canvas.toDataURL();
    var link = document.createElement("a");

    link.setAttribute('href', base64);
    link.setAttribute('download', 'pixemoji.png');
    link.click();
    link.remove()
  }

  clear = () => {
    this.setState({ pixels: [], redo: [...this.state.pixels] })
  }

  getColorPickerButtonCoords = () => {
    const button = document.getElementById('color-picker-button')
    const buttonTop = button.offsetTop
    const buttonLeft = button.offsetLeft
    const buttonHeight = button.offsetHeight
    const buttonWidth = button.offsetWidth

    return {x: (buttonTop + buttonHeight),y: (buttonLeft + buttonWidth) }
  }
  
  render() {
    return (
    <Grid container={true} alignItems="center" justify="center">
      <Grid id="tool-container" container={true} alignItems="center" justify="center">
        <Preview 
          ref="preview" 
          pixels={this.state.pixels} 
          size={this.state.size} 
          scale={this.state.scale} 
        />
        <Button onClick={this.toggleColorPicker} id="color-picker-button"><ColorLens /></Button>
        <Button onClick={this.increaseScale}><ZoomIn /></Button>
        <Button onClick={this.decreaseScale}><ZoomOut /></Button>
        <Button onClick={this.undo}><Undo /></Button>
        <Button onClick={this.redo}><Redo /></Button>
        <Button onClick={this.clear}><Clear /></Button>
        <Button variant="contained" color="primary" onClick={this.save}>Save</Button>
      </Grid>
      <Grid container={true} alignItems="center" justify="center">
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
      { this.state.showColorPicker ? (
          <Draggable 
            id="draggable" 
            handle="#drag-bar"
            defaultPosition={{x: -22, y: -700}}
          >
            <div id="color-picker">
              <div id="drag-bar"></div>
              <SketchPicker color={this.state.color} onChangeComplete={this.handleColorPick} />
            </div>
          </Draggable>
        ) : null }
    </Grid>
    )
  }
}
