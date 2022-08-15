import './App.css';
import KeyBoard from '@uiw/react-mac-keyboard';
import { useEffect, useCallback, useReducer, useRef } from 'react';
import hotkeys from 'hotkeys-js';
import * as emulstick from './emulstick';
import { useMount } from 'react-use';

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

  const onKeyBoardMouseDown = useCallback((e, item) => {
    console.log(item);
    if (item.keycode > -1) {
      dispatch({ keyStr: [item.keycode] });
      if (keyboardServiceRef.current) {
        emulstick.sendKeyDown(
          keyboardServiceRef.current,
          item.name[0].toLowerCase(),
        );
      }
    }
  });
  const onKeyBoardMouseUp = useCallback((e, item) => {
    dispatch({ keyStr: [] });
    if (keyboardServiceRef.current) {
      emulstick.sendKeyUp(
        keyboardServiceRef.current,
        item.name[0].toLowerCase(),
      );
    }
  });

  const onKeyUpEvent = useCallback((e) => {
    console.log(e);
    // dispatch({
    //   keyCode: [],
    //   keyStr: []
    // })
  });

  useEffect(() => {
    document.addEventListener('keyup', onKeyUpEvent);
    const onkeydown = (e) => {
      console.log(e);
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

    const listenHot = (evn) => {
      evn.preventDefault();
      const keys = [];
      const keyStr = [];
      if (hotkeys.shift) {
        pkeys(keys, 16);
        pkeysStr(keyStr, 'shift');
      }
      if (hotkeys.ctrl) {
        pkeys(keys, 17);
        pkeysStr(keyStr, 'ctrl');
      }
      if (hotkeys.alt) {
        pkeys(keys, 18);
        pkeysStr(keyStr, 'alt');
      }
      if (hotkeys.control) {
        pkeys(keys, 17);
        pkeysStr(keyStr, 'control');
      }
      if (hotkeys.command) {
        pkeys(keys, 91);
        pkeysStr(keyStr, 'command');
      }
      keyStr.push(evn.key);
      if (keys.indexOf(evn.code) === -1) keys.push(evn.keyCode);
      dispatch({ keyCode: keys, keyStr });
    };

    hotkeys('*', listenHot);

    return () => {
      document.removeEventListener('keyup', onKeyUpEvent);
      document.removeEventListener('keydown', onkeydown);
      hotkeys.unbind('*', listenHot);
    };
  }, []);

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
      <input />
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
