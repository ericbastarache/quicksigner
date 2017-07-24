import React from 'react';
import './Signature.css';

const Signature = (props) => {
  return (
    <canvas
      ref={props.handleRef}
      height={props.height}
      width={props.width}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
      onMouseOut={props.onMouseUp}
      />
  );
}

export default Signature;
