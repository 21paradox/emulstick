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

const useMouse = () => {
  const [state, dispatch] = useReducer(reducer, {}, initState);
  const mouseServiceRef = useRef(null);
  // const mouseServiceRef = useRef(null);

  const dom = <div className="padwrap">
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
      style={{
        background: '#999',
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

  return {
    dom,
    state,
    mouseServiceRef,
  }
}

export default useMouse