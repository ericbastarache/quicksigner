import React, { Component } from 'react';

import Signature from '../components/Signature/Signature';
import './SignatureContainer.css';

import { Button } from 'react-bootstrap';

class SignatureContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isValid: false,
      img: null
    }
  }

  componentDidMount () {
    const canvas = this.canvas;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    this.setState({
      canvas,
      ctx
    });
  }

  handleMouseDown = (e) => {
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.ctx.beginPath();
    this.setState({
      lastX: e.clientX - rect.left,
      lastY: e.clientY - rect.top
    });

    this.setState({
      drawing: true
    });
  }

  handleMouseUp = (e) => {
    this.setState({drawing: false});
  }

  handleMouseMove = (e) => {
    if(this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }

  draw(lx, ly, cx, cy) {
    const drawCtx = this.state.ctx;

    drawCtx.strokeStyle = 'black';
    drawCtx.lineWidth = 2;

    this.setState({ctx: drawCtx});

    this.state.ctx.moveTo(lx, ly);
    this.state.ctx.lineTo(cx, cy);

    this.state.ctx.stroke();
  }

  eraseCanvas = (e) => {
    const eraseCtx = this.state.ctx;
    eraseCtx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
  }

  saveImage = (e) => {
    const canvasImg = this.state.canvas;
    let pImg = canvasImg.toDataURL('image/png');
    this.setState({isValid: true, img: pImg})
  }

  render() {
    return (
      <div>
        <Signature
          width="450"
          height="75"
          handleRef={(canvas) => this.canvas = canvas}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseOut={this.handleMouseUp}
          />
        <div className="button-wrapper">
          <Button
            onClick={this.eraseCanvas}>
            Erase
          </Button>
          <Button
            onClick={this.saveImage}>
            Save Signature
          </Button>
          {this.state.isValid ? <a href={this.state.img} download={this.state.img} className="signature">Download Signature</a> : ''}
        </div>
      </div>
    );
  }
}

export default SignatureContainer;
