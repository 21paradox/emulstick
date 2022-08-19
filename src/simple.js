import './App.css';
import * as emulstick from './emulstick';
import useKeyboard from './useKeyboard';
import useMouse from './useMouse'

function Simple() {
  const keyboard =useKeyboard()
  const mouse = useMouse()

  return (
    <div style={{position: 'fixed'}}>
      <div style={{ marginTop: 10 }}>
        <button
          onClick={async () => {
            const { primaryService } = await emulstick.openBlueTooth();
            const keyboardService = await emulstick.getKeyboardService(
              primaryService,
            );
            keyboard.keyboardServiceRef.current = keyboardService;
            const mouseService = await emulstick.getMouseService(
              primaryService,
            );
            mouse.mouseServiceRef.current = mouseService;
          }}
        >
          connect emulstick
        </button>
      </div>
      <div style={{marginLeft: -50}}>
        {mouse.dom}
      </div>
    </div>
  );
}

export default Simple;
