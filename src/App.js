import './App.css';
import KeyBoard from '@uiw/react-mac-keyboard';
import { useEffect, useCallback, useReducer, useRef } from 'react';
import hotkeys from 'hotkeys-js';
import * as emulstick from './emulstick';
import * as KeyCode from 'keycode-js'

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
      emulstick.sendKeyUp(
        keyboardServiceRef.current,
      );
    }
  }, []);

  const onKeyUpEvent = useCallback((e) => {
    // console.log(e);
    dispatch({
      keyCode: [],
      keyStr: []
    })
  }, []);

  useEffect(() => {
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
      console.log({
        cmd: hotkeys.command,
        control: hotkeys.control,
        shift: hotkeys.shift,
        alt: hotkeys.alt,
      }, evn.type, evn);
      evn.preventDefault();
      const keys = [];
      const keyStr = [];

      if (evn.type === 'keydown') {
        hotkeysMap.current[evn.code] = true
      } else {
        hotkeysMap.current[evn.code] = null
      }
      const operationKeys = [
        0, 0, 0, 0, 0, 0, 0, 0
      ]
      if (hotkeysMap.current[KeyCode.CODE_SHIFT_LEFT]) {
        operationKeys[6] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_SHIFT_RIGHT]) {
        operationKeys[2] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_CONTROL_LEFT]) {
        operationKeys[7] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_CONTROL_RIGHT]) {
        operationKeys[3] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_ALT_LEFT]) {
        operationKeys[5] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_ALT_RIGHT]) {
        operationKeys[1] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_META_LEFT]) {
        operationKeys[4] = 1
      } else if (hotkeysMap.current[KeyCode.CODE_META_RIGHT]) {
        operationKeys[0] = 1
      }
      const operationNum = parseInt(operationKeys.join(''), 2)

      if (evn.type === 'keydown') {
        emulstick.sendKeyDown(
          keyboardServiceRef.current,
          emulstick.CodeMap[evn.code],
          operationNum
        );
      } else {
        emulstick.sendKeyUp(
          keyboardServiceRef.current,
          operationNum
        );
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

    return () => {
      document.removeEventListener('keyup', onKeyUpEvent);
      document.removeEventListener('keydown', onkeydown);
      hotkeys.unbind('*', listenHot);
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
          }}
        >
          connect emulstick
        </button>
      </div>
      <KeyBoard
        style={{ top: 40 }}
        onMouseDown={onKeyBoardMouseDown}
        onMouseUp={onKeyBoardMouseUp}
        keyCode={state.keyCode}
      />
    </div>
  );
}

export default App;
