import './App.css';
import * as emulstick from './emulstick';
import useKeyboard from './useKeyboard';
import useMouse from './useMouse'

function Full() {
  const keyboard =useKeyboard()
  const mouse = useMouse()

  return (
    <div className="App"> 
      <div style={{ marginTop: 30 }}>
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

      <div style={{ width: '100%', textAlign: 'center', paddingTop: 40 }}>
        {keyboard.dom}
        <br />
        {mouse.dom}
        {mouse.dom1}
      </div>
    </div>
  );
}

export default Full;
