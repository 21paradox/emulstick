import './App.css';
import KeyBoard from '@uiw/react-mac-keyboard';
import {
  useEffect,
  useCallback,
  useReducer,
  useRef,
  useLayoutEffect,
} from 'react';
import hotkeys from 'hotkeys-js';
import nipplejs from 'nipplejs';
import * as emulstick from './emulstick';
import * as KeyCode from 'keycode-js';

function initState() {
  return {
    count: 0,
    keyCode: [],
    keyStr: [],
  };
}

function reducer(state, action) {
  return {
    ...state,
    ...action,
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, {}, initState);
  const keyboardServiceRef = useRef(null);
  const hotkeysMap = useRef({});
  const mouseServiceRef = useRef(null);

  const onKeyBoardMouseDown = useCallback((e, item) => {
    if (item.keycode > -1) {
      dispatch({ keyStr: [item.keycode] });
      if (keyboardServiceRef.current) {
        emulstick.sendKeyDown(
          keyboardServiceRef.current,
          emulstick.KeyCodeMap[item.keycode],
        );
      }
    }
  }, []);
  const onKeyBoardMouseUp = useCallback((e, item) => {
    dispatch({ keyStr: [] });
    if (keyboardServiceRef.current) {
      emulstick.sendKeyUp(keyboardServiceRef.current);
    }
  }, []);

  const onKeyUpEvent = useCallback((e) => {
    // console.log(e);
    dispatch({
      keyCode: [],
      keyStr: [],
    });
  }, []);

  useLayoutEffect(() => {
    document.addEventListener('keyup', onKeyUpEvent);
    const onkeydown = (e) => {
      // console.log(e);
    };
    document.addEventListener('keydown', onkeydown);
    function pkeys(keys, key) {
      if (keys.indexOf(key) === -1) keys.push(key);
      return keys;
    }
    function pkeysStr(keysStr, key) {
      if (keysStr.indexOf(key) === -1) keysStr.push(key);
      return keysStr;
    }

    const listenHot = async (evn) => {
      // console.log({
      //   cmd: hotkeys.command,
      //   control: hotkeys.control,
      //   shift: hotkeys.shift,
      //   alt: hotkeys.alt,
      // }, evn.type, evn);
      evn.preventDefault();
      const keys = [];
      const keyStr = [];

      if (evn.type === 'keydown') {
        hotkeysMap.current[evn.code] = true;
      } else {
        hotkeysMap.current[evn.code] = null;
      }
      const operationKeys = [0, 0, 0, 0, 0, 0, 0, 0];
      if (hotkeysMap.current[KeyCode.CODE_SHIFT_LEFT]) {
        operationKeys[6] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_SHIFT_RIGHT]) {
        operationKeys[2] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_CONTROL_LEFT]) {
        operationKeys[7] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_CONTROL_RIGHT]) {
        operationKeys[3] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_ALT_LEFT]) {
        operationKeys[5] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_ALT_RIGHT]) {
        operationKeys[1] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_META_LEFT]) {
        operationKeys[4] = 1;
      } else if (hotkeysMap.current[KeyCode.CODE_META_RIGHT]) {
        operationKeys[0] = 1;
      }
      const operationNum = parseInt(operationKeys.join(''), 2);

      if (keyboardServiceRef.current) {
        if (evn.type === 'keydown') {
          emulstick.sendKeyDown(
            keyboardServiceRef.current,
            emulstick.CodeMap[evn.code],
            operationNum,
          );
        } else {
          emulstick.sendKeyUp(keyboardServiceRef.current, operationNum);
        }
      }

      if (hotkeys.shift) {
        pkeys(keys, 16);
        pkeysStr(keyStr, 'shift');
      }
      if (hotkeys.ctrl || hotkeys.control) {
        pkeys(keys, 17);
        pkeysStr(keyStr, 'ctrl');
      }
      if (hotkeys.alt) {
        pkeys(keys, 18);
        pkeysStr(keyStr, 'alt');
      }
      if (hotkeys.command) {
        pkeys(keys, 91);
        pkeysStr(keyStr, 'command');
      }

      keyStr.push(evn.key);
      if (keys.indexOf(evn.code) === -1) keys.push(evn.keyCode);
      dispatch({ keyCode: keys, keyStr });
    };

    hotkeys('*', { keyup: true }, listenHot);

    var stick = nipplejs.create({
      zone: document.getElementById('semi'),
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: 'red',
      size: 90,
      // threshold: 0.22,
    });

    let forceTimer = null

    stick.on('move', (e, data) => {
      const vector = data.vector;
      const force = data.force
      const sendfn = (ratio) => {
        emulstick.sendMouseEvent(
          mouseServiceRef.current,
          0,
          vector.x * force * ratio,
          (0 - vector.y) * force * ratio,
        );
      }
      sendfn(1)
      if (forceTimer) {
        clearInterval(forceTimer)
        forceTimer = null
      }
      forceTimer = setInterval(() =>{
        sendfn(5)
      }, 40)
    });

    let startTime = null;
    stick.on('start', () => {
      if (forceTimer) {
        clearInterval(forceTimer)
        forceTimer = null
      }
      startTime = Date.now();
    });
    stick.on('end', () => {
      if (forceTimer) {
        clearInterval(forceTimer)
        forceTimer = null
      }
      if (Date.now() - startTime < 200) {
        const operationKeys = [0, 0, 0, 0, 0, 0, 0, 1];
        if (mouseServiceRef.current) {
          const operationNum = parseInt(operationKeys.join(''), 2);
          emulstick.sendMouseEvent(mouseServiceRef.current, operationNum, 0, 0);
          emulstick.sendMouseEvent(mouseServiceRef.current, 0, 0, 0);
        }
      }
    });

    return () => {
      document.removeEventListener('keyup', onKeyUpEvent);
      document.removeEventListener('keydown', onkeydown);
      hotkeys.unbind('*', listenHot);
      stick.destroy();
    };
  }, [onKeyUpEvent]);

  return (
    <div className="App">
      <div style={{ marginTop: 30 }}>
        <button
          onClick={async () => {
            const { primaryService } = await emulstick.openBlueTooth();
            const keyboardService = await emulstick.getKeyboardService(
              primaryService,
            );
            keyboardServiceRef.current = keyboardService;
            const mouseService = await emulstick.getMouseService(
              primaryService,
            );
            mouseServiceRef.current = mouseService;
          }}
        >
          connect emulstick
        </button>
      </div>
      <div style={{ width: '100%', textAlign: 'center', paddingTop: 40 }}>
        <KeyBoard
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
          onMouseDown={onKeyBoardMouseDown}
          onMouseUp={onKeyBoardMouseUp}
          keyCode={state.keyCode}
        />
        <div className="padwrap">
          <div
            id="semi"
            className="padcontrol"
            style={{
              width: 200,
              height: 200,
              background: '#999',
            }}
          ></div>
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
      </div>
    </div>
  );
}

export default App;
