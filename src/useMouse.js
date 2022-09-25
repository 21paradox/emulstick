import './App.css';
import {
  useReducer,
  useRef,
} from 'react';
import * as emulstick from './emulstick';

function initState() {
  return {
    count: 0,
  };
}

function reducer(state, action) {
  return {
    ...state,
    ...action,
  };
}

const useMouse = (props ={}) => {
  const [state, dispatch] = useReducer(reducer, {}, initState);
  const mouseServiceRef = useRef(null);
  // const mouseServiceRef = useRef(null);

  const dom = <div className="padwrap padwrap-mouse" style={{
    width: props.width || 200,
    height: props.height || 200,
  }}>
    <div
      id="semi"
      className="padcontrol"
      onMouseDown={(e) => {
        e.nativeEvent.stopPropagation();
        const operationKeys = [0, 0, 0, 0, 0, 0, 0, 1];
        const operationNum = parseInt(operationKeys.join(''), 2);
        emulstick.sendMouseEvent(
          mouseServiceRef.current,
          operationNum,
          0,
          0,
        );
      }}
      onMouseUp={(e) => {
        e.nativeEvent.stopPropagation();
        emulstick.sendMouseEvent(mouseServiceRef.current, 0, 0, 0);
      }}
      onWheelCapture={(e) => {
        const velx = Number(e.deltaX)
        const vely = Number(e.deltaY)
        emulstick.sendMouseEvent(
          mouseServiceRef.current,
          0,
          0 - velx,
          0 - vely,
        );
      }}
      onContextMenu={async (e) => {
        e.preventDefault()
        const operationKeys = [0, 0, 0, 0, 0, 0, 0, 1];
        const operationNum = parseInt(operationKeys.join(''), 2);
        await emulstick.sendMouseEvent(
          mouseServiceRef.current,
          operationNum,
          0,
          0,
        );
        emulstick.sendMouseEvent(mouseServiceRef.current, 0, 0, 0);
      }}
    >
      <span>move using two fingers</span>
    </div>
    <div className="bottompad">
      <button
        onMouseDown={(e) => {
          e.nativeEvent.stopPropagation();
          const operationKeys = [0, 0, 0, 0, 0, 0, 0, 1];
          const operationNum = parseInt(operationKeys.join(''), 2);
          emulstick.sendMouseEvent(
            mouseServiceRef.current,
            operationNum,
            0,
            0,
          );
        }}
        onMouseUp={(e) => {
          e.nativeEvent.stopPropagation();
          emulstick.sendMouseEvent(mouseServiceRef.current, 0, 0, 0);
        }}
      >
        L
      </button>
      <button
        onMouseDown={(e) => {
          e.nativeEvent.stopPropagation();
          const operationKeys = [0, 0, 0, 0, 0, 0, 1, 0];
          const operationNum = parseInt(operationKeys.join(''), 2);
          emulstick.sendMouseEvent(
            mouseServiceRef.current,
            operationNum,
            0,
            0,
          );
        }}
        onMouseUp={(e) => {
          e.nativeEvent.stopPropagation();
          emulstick.sendMouseEvent(mouseServiceRef.current, 0, 0, 0);
        }}
      >
        R
      </button>
    </div>
  </div>


  const dom1 = <div className="padwrap padwrap-wheel" style={{
    width: props.width || 200,
    height: props.height || 200,
  }}>
    <div
      id="semi"
      className="panwheel"
      onWheelCapture={(e) => {
        e.nativeEvent.stopPropagation();
        if (Date.now() % 2 === 0) {
          return
        }
        if (Date.now() % 3 === 0) {
          return
        }
        const vely = Number(e.deltaY)
        let velyNew = vely
        if (vely > 0) {
          velyNew = Math.ceil(Math.pow(vely , 1/4))
        } else if (vely < 0) {
          velyNew = 0 - Math.floor(Math.pow(0 - vely, 1 / 4))
        } else {
          velyNew = 0
        }
        emulstick.sendWheelEvent(
          mouseServiceRef.current,
          0 - velyNew,
        )
      }}
      onContextMenu={async (e) => {
        e.preventDefault()
      }}
      style={{
        background: '#999',
      }}
    >
      <span>move using two fingers(scroll)</span>
    </div>
  </div>

  const dom2 = <div className="padwrap padwrap-drag" style={{
    width: props.width || 200,
    height: props.height || 200,
  }}>
    <div
      id="semi"
      className="panwheel"
      onWheelCapture={(e) => {
        const velx = Number(e.deltaX)
        const vely = Number(e.deltaY)
        const operationKeys = [0, 0, 0, 0, 0, 0, 0, 1];
        const operationNum = parseInt(operationKeys.join(''), 2);
        emulstick.sendMouseEvent(
          mouseServiceRef.current,
          operationNum,
          0 - velx,
          0 - vely,
        );
      }}
      onContextMenu={async (e) => {
        e.preventDefault()
      }}
      style={{
        background: '#999',
      }}
    >
      <span>move using two fingers(drag)</span>
    </div>
  </div>

  return {
    dom,
    dom1,
    dom2,
    state,
    mouseServiceRef,
  }
}

export default useMouse