import * as KeyCode from 'keycode-js'
export const CUSTOM_SERVICE_ID = '0000F800-0000-1000-8000-00805f9b34fb';
export const KEYBOARD_CHARACTERISTIC_ID =
  '0000F801-0000-1000-8000-00805f9b34fb';
export const MOUSE_CHARACTERISTIC_ID =
  '0000F803-0000-1000-8000-00805f9b34fb';

export const openBlueTooth = async () => {
  const options = {
    filters: [
      {
        namePrefix: 'EmulStick',
      },
    ],
    optionalServices: [CUSTOM_SERVICE_ID.toLowerCase()],
  };
  const device = await navigator.bluetooth.requestDevice(options);
  const conn = await device.gatt.connect();
  const primaryService = await conn.getPrimaryService(
    CUSTOM_SERVICE_ID.toLowerCase(),
  );

  return {
    device,
    conn,
    primaryService,
  };
};

export const getKeyboardService = async (primaryService) => {
  const keyboardService = await primaryService.getCharacteristic(
    KEYBOARD_CHARACTERISTIC_ID.toLowerCase(),
  );
  return keyboardService;
};


export const getMouseService = async (primaryService) => {
  const keyboardService = await primaryService.getCharacteristic(
    MOUSE_CHARACTERISTIC_ID.toLowerCase(),
  );
  return keyboardService;
};



// KB_a_and_A 4 "a", "A"
// KB_b_and_B 5 "b", "B"
// KB_c_and_C 6 "c", "C"
// KB_d_and_D 7 "d", "D"
// KB_e_and_E 8 "e", "E"
// KB_f_and_F 9 "f", "R"
// KB_g_and_G 10 "g", "G"
// KB_h_and_H 11 "h", "H"
// KB_i_and_I 12 "i", "I"
// KB_j_and_J 13 "j", "J"
// KB_k_and_K 14 "k", "K"
// KB_l_and_L 15 "l", "L"
// KB_m_and_M 16 "m", "M"
// KB_n_and_N 17 "n", "N"
// KB_o_and_O 18 "o", "O"
// KB_p_and_P 19 "p", "P"
// KB_q_and_Q 20 "q", "Q"
// KB_r_and_R 21 "r", "R"
// KB_s_and_S 22 "s", "S"
// KB_t_and_T 23 "t", "T"
// KB_u_and_U 24 "u", "U"
// KB_v_and_V 25 "v", "V"
// KB_w_and_W 26 "w", "W"
// KB_x_and_X 27 "x", "X"
// KB_y_and_Y 28 "y", "Y"
// KB_z_and_Z 29 "z", "Z"
// KB_1_and_Symbol 30 "1", "!"
// KB_2_and_Symbol 31 "2", "@"
// KB_3_and_Symbol 32 "3", "#"
// KB_4_and_Symbol 33 "4", "$"
// KB_5_and_Symbol 34 "5", "%"
// KB_6_and_Symbol 35 "6", "^"
// KB_7_and_Symbol 36 "7", "&"
// KB_8_and_Symbol 37 "8", "*"
// KB_9_and_Symbol 38 "9", "("
// KB_0_and_Symbol 39 "0", ")"
// KB_Enter 40 "Enter"
// KB_Escape 41 "Esc"
// KB_Backspace 42 "Back Space"
// KB_Tab 43 "Tab"
// KB_Spacebar 44 "Space Bar"
// KB_Minus 45 "-", "_"
// KB_Equal_and_Plus 46 "=", "+"
// KB_Bracket_Left 47 "[", "{"
// KB_Bracket_Right 48 "]", "}"
// KB_Slash 49 "\\", "|"
// KB_NonUs_Hashtag 50    (Non - US / Ansi)
// KB_Semicolon 51 ";", ":"
// KB_Quotation 52 "'", "\""
// KB_GraveAccent 53 "`", "~"
// KB_Comma 54 ",", "<"
// KB_Period 55 ".", ">"
// KB_Division 56 "/", "?"
// KB_CapsLock 57 "Caps Lock"
// KB_F1 58 "F1"
// KB_F2 59 "F2"
// KB_F3 60 "F3"
// v0.9.1 May
// .2021
// KB_F4 61 "F4"
// KB_F5 62 "F5"
// KB_F6 63 "F6"
// KB_F7 64 "F7"
// KB_F8 65 "F8"
// KB_F9 66 "F9"
// KB_F10 67 "F10"
// KB_F11 68 "F11"
// KB_F12 69 "F12"
// KB_PrintScreen 70 "Print Sreen"
// KB_ScrollLock 71 "Scroll Lock"
// KB_Pause 72 "Pause"
// KB_Insert 73 "Ins"
// KB_Home 74 "Home"
// KB_PageUp 75 "PageUp"
// KB_Delete 76 "Del"
// KB_End 77 "End"
// KB_PageDown 78 "Page Down"
// KB_RightArrow 79 "Arrow Right"
// KB_LeftArrow 80 "Arrow Left"
// KB_DownArrow 81 "Arrow Down"
// KB_UpArrow 82 "Arrow Up"
// KP_NumLock_and_Clear 83 "N/L"
// KP_Division 84 "/"
// KP_Multiply 85 "*"
// KP_Minus 86 "-"
// KP_Plus 87 "+"
// KP_Enter 88 "Enter"
// KP_1_and_End 89 "1", "End"
// KP_2_and_DownArrow 90 "2", "Arrow Down"
// KP_3_and_PageDown 91 "3", "Page Down"
// KP_4_and_LeftArrow 92 "4", "Arrow Left"
// KP_5 93 "5"
// KP_6_and_RightArrow 94 "6", "Arrow Right"
// KP_7_and_Home 95 "7", "Home"
// KP_8_and_UpArrow 96 "8", "Arrow Up"
// KP_9_and_PageUp 97 "9", "Page Up"
// KP_0_and_Insert 98 "0", "Ins"
// KP_Period_and_Delete 99 ".", "Del"
// KB_NonUs_Slash_Right 100(Non - US / Ansi)
// KB_PC_Application 101 "Menu"
// KB_Power 102(Not a physical key）
//   KP_Equal 103 "="
// KB_MAC_F13 104 "F13"
// KB_MAC_F14 105 "F14"
// KB_MAC_F15 106 "F15"

const KeyMap = {
  A: 4,
  B: 5,
  C: 6,
  D: 7,
  E: 8,
  F: 9,
  G: 10,
  H: 11,
  I: 12,
  J: 13,
  K: 14,
  L: 15,
  M: 16,
  N: 17,
  O: 18,
  P: 19,
  Q: 20,
  R: 21,
  S: 22,
  T: 23,
  U: 24,
  V: 25,
  W: 26,
  X: 27,
  Y: 28,
  Z: 29,
  "1": 30,
  "2": 31,
  "3": 32,
  "4": 33,
  "5": 34,
  "6": 35,
  "7": 36,
  "8": 37,
  "9": 38,
  "0": 39,
  "ENTER": 40,
  "RETURN": 40,
  "ESCAPE": 41,
  "BACK_SPACE": 42,
  "TAB": 43,
  "SPACE": 44,
  "MINUS": 45,
  "DASH": 45,
  "EQUALS": 46,
  "OPEN_BRACKET": 47,
  "CLOSE_BRACKET": 48,
  "BACK_SLASH": 49,
  // KB_NonUs_Hashtag 50    (Non - US / Ansi)
  "SEMICOLON": 51,
  "QUOTE": 52,
  "BACK_QUOTE": 53,
  "COMMA": 54,
  "PERIOD": 55,
  SLASH: 56,
  CAPS_LOCK: 57,
  F1: 58,
  F2: 59,
  F3: 60,
  F4: 61,
  F5: 62,
  F6: 63,
  F7: 64,
  F8: 65,
  F9: 66,
  F10: 67,
  F11: 68,
  F12: 69,
  PRINTSCREEN: 70,
  SCROLL_LOCK: 71,
  PAUSE: 72,
  INSERT: 73,
  HOME: 74,
  PAGEUP: 75,
  DELETE: 76,
  END: 77,
  PAGE_DOWN: 78,
  RIGHT: 79,
  LEFT: 80,
  DOWN: 81,
  UP: 82,
  NUM_LOCK: 83,
  DIVIDE: 84,
  MULTIPLY: 85,
  // MINUS: 86,
  // PLUS: 87
  // ENTER: 88
}

export const KeyCodeMap = {}
for (const key in KeyMap) {
  KeyCodeMap[KeyCode[`KEY_${key}`]] = KeyMap[key]
}

export const CodeMap = {}
for (const key in KeyMap) {
  CodeMap[KeyCode[`CODE_${key}`]] = KeyMap[key]
}

// KP_1_and_End 89 "1", "End"
// KP_2_and_DownArrow 90 "2", "Arrow Down"
// KP_3_and_PageDown 91 "3", "Page Down"
// KP_4_and_LeftArrow 92 "4", "Arrow Left"
// KP_5 93 "5"
// KP_6_and_RightArrow 94 "6", "Arrow Right"
// KP_7_and_Home 95 "7", "Home"
// KP_8_and_UpArrow 96 "8", "Arrow Up"
// KP_9_and_PageUp 97 "9", "Page Up"
// KP_0_and_Insert 98 "0", "Ins"
// KP_Period_and_Delete 99 ".", "Del"
// KB_NonUs_Slash_Right 100(Non - US / Ansi)
// KB_PC_Application 101 "Menu"
// KB_Power 102(Not a physical key）
//   KP_Equal 103 "="
// KB_MAC_F13 104 "F13"
// KB_MAC_F14 105 "F14"
// KB_MAC_F15 106 "F15"

const q = []
const pushQ = async (nextfn) => {
  const nextTask = new Promise(async (resolve, reject) => {
    await Promise.all(q)
    resolve(nextfn())
  })
  q.push(nextTask)
  await Promise.all(q)
  q.length = 0
}

export const sendKeyDown = async (keyboardService, sendNum, operation = 0) => {
  const payload = new Uint8Array(8);
  // if (typeof KeyStrMap[keyStr] === 'undefined') {
  //   throw keyStr
  // }
  if (typeof sendNum === 'undefined') {
    sendNum = 0
  }
  payload[0] = operation;
  payload[1] = 0;
  payload[2] = sendNum;
  payload[3] = 0;
  payload[4] = 0;
  payload[5] = 0;
  payload[6] = 0;
  payload[7] = 0;
  // pushQ(() => {
  return keyboardService && keyboardService.writeValueWithoutResponse(payload);
  // })
  // const resp = await keyboardService.writeValueWithoutResponse(payload);
  // return resp
}

export const sendKeyUp = async (keyboardService, operation = 0) => {
  const payload = new Uint8Array(8);
  payload[0] = operation;
  payload[1] = 0;
  payload[2] = 0;
  payload[3] = 0;
  payload[4] = 0;
  payload[5] = 0;
  payload[6] = 0;
  payload[7] = 0;
  // const resp = await keyboardService.writeValueWithoutResponse(payload);
  // return resp
  // pushQ(() => {
  return keyboardService && keyboardService.writeValueWithoutResponse(payload);
  // })
}

export const getInt8Vals = (num) => { // -2047 - 2047
  const buffer = new ArrayBuffer(2);
  const view = new DataView(buffer);
  view.setInt16(0, num)
  const low = view.getInt8(1)
  const high = view.getInt8(0)

  return {
    high,
    low
  }
}

export const sendMouseEvent = async (mouseService, operation = 0, posX, posY) => {
  const payload = new Int8Array(8)
  payload[0] = operation;

  const posXArr = getInt8Vals(posX)
  const posYArr = getInt8Vals(posY)

  payload[1] = posXArr.low;
  payload[2] = posXArr.high;
  payload[3] = posYArr.low;
  payload[4] = posYArr.high;
  payload[5] = 0;
  // console.log(payload)
  // return resp
  // pushQ(() => {
  return mouseService && mouseService.writeValueWithoutResponse(payload);
  // })
}

export const sendWheelEvent = async (mouseService, wheel = 0) => {
  const payload = new Int8Array(8)

  payload[1] = 0
  payload[2] = 0
  payload[3] = 0
  payload[4] = 0
  payload[5] = wheel;
  // return resp
  // pushQ(() => {
  return mouseService && mouseService.writeValue(payload);
  // })
}


export const sendByString = async (keyboardService, str) => {
  const str1 = str || "";
  const opNum = (cb) => {
    const operationKeys = [0, 0, 0, 0, 0, 0, 0, 0];
    if (cb) {
      cb(operationKeys)
    }
    const operationNum = parseInt(operationKeys.join(''), 2);
    return operationNum
  }

  const sendKeyDown = async (sendNum, operation = 0) => {
    const payload = new Uint8Array(8);
    if (typeof sendNum === 'undefined') {
      sendNum = 0
    }
    payload[0] = operation;
    payload[1] = 0;
    payload[2] = sendNum;
    payload[3] = 0;
    payload[4] = 0;
    payload[5] = 0;
    payload[6] = 0;
    payload[7] = 0;
    return keyboardService.writeValueWithResponse(payload);
  }

  const sendKeyUp = async (operation = 0) => {
    const payload = new Uint8Array(8);
    payload[0] = operation;
    payload[1] = 0;
    payload[2] = 0;
    payload[3] = 0;
    payload[4] = 0;
    payload[5] = 0;
    payload[6] = 0;
    payload[7] = 0;
    return keyboardService.writeValueWithResponse(payload);
  }
  for (let i = 0; i < str1.length; i++) {
    const key = str1[i]

    switch (key) {
      case '~': {
        const keytoSend = KeyMap['BACK_QUOTE']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '`': {
        const keytoSend = KeyMap['BACK_QUOTE']
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }
      case '!': {
        const keytoSend = KeyMap['1']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '@': {
        const keytoSend = KeyMap['2']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '#': {
        const keytoSend = KeyMap['3']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '$': {
        const keytoSend = KeyMap['4']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '%': {
        const keytoSend = KeyMap['5']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '^': {
        const keytoSend = KeyMap['6']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '&': {
        const keytoSend = KeyMap['7']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '*': {
        const keytoSend = KeyMap['8']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '(': {
        const keytoSend = KeyMap['9']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case ')': {
        const keytoSend = KeyMap['0']
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '_': {
        const keytoSend = KeyMap.MINUS
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '-': {
        const keytoSend = KeyMap.MINUS
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }

      case '+': {
        const keytoSend = KeyMap.EQUALS
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }

      case '=': {
        const keytoSend = KeyMap.EQUALS
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }

      case '{': {
        const keytoSend = KeyMap.OPEN_BRACKET
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '[': {
        const keytoSend = KeyMap.OPEN_BRACKET
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }
      case '}': {
        const keytoSend = KeyMap.CLOSE_BRACKET
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case ']': {
        const keytoSend = KeyMap.CLOSE_BRACKET
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }
      case ':': {
        const keytoSend = KeyMap.SEMICOLON
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case ';': {
        const keytoSend = KeyMap.SEMICOLON
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }
      case '"': {
        const keytoSend = KeyMap.QUOTE
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case "'": {
        const keytoSend = KeyMap.QUOTE
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }
      case '<': {
        const keytoSend = KeyMap.COMMA
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case ',': {
        const keytoSend = KeyMap.COMMA
        await sendKeyDown(keytoSend, opNum((opkeys) => {
        }))
        await sendKeyUp()
        break
      }
      case '>': {
        const keytoSend = KeyMap.PERIOD
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }
      case '.': {
        const keytoSend = KeyMap.PERIOD
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }
      case '?': {
        const keytoSend = KeyMap.SLASH
        await sendKeyDown(keytoSend, opNum((opkeys) => {
          opkeys[6] = 1 // shift
        }))
        await sendKeyUp()
        break
      }

      case '/': {
        const keytoSend = KeyMap.SLASH
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }

      case ' ': {
        const keytoSend = KeyMap.SPACE
        await sendKeyDown(keytoSend, opNum((opkeys) => { }))
        await sendKeyUp()
        break
      }

      case 'A':
      case 'B':
      case 'C':
      case 'D':
      case 'E':
      case 'F':
      case 'G':
      case 'H':
      case 'I':
      case 'J':
      case 'K':
      case 'L':
      case 'M':
      case 'N':
      case 'O':
      case 'P':
      case 'Q':
      case 'R':
      case 'S':
      case 'T':
      case 'U':
      case 'V':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
        {
          const keytoSend = KeyMap[key]
          await sendKeyDown(keytoSend, opNum((opkeys) => {
            opkeys[6] = 1 // shift
          }))
          await sendKeyUp()
          break
        }
      default: {
        if (/[0-9a-z]/.test(key)) {
          const keytoSend = KeyMap[key.toUpperCase()]
          if (typeof keytoSend === 'number') {
            await sendKeyDown(keytoSend, opNum((opkeys) => { }))
            await sendKeyUp()
          }
        }
      }
    }
  }


}