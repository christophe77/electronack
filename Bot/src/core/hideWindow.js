const ref = require("ref-napi");
const ffi = require("ffi-napi");

const voidPtr = ref.refType(ref.types.void);
const stringPtr = ref.refType(ref.types.CString);

const user32 = ffi.Library("user32.dll", {
  EnumWindows: ["bool", [voidPtr, "int32"]],
  GetWindowTextA: ["long", ["long", stringPtr, "long"]],
  ShowWindow: ["int", ["int", "int"]],
});

function hideWindow(windowName) {
  windowProc = ffi.Callback("bool", ["long", "int32"], function (hwnd, lParam) {
    const buf = new Buffer.alloc(255);
    const ret = user32.GetWindowTextA(hwnd, buf, 255);
    const name = ref.readCString(buf, 0);
    if (ret && name.includes(windowName)) {
      user32.ShowWindow(hwnd, 0);
    }
    return true;
  });
  user32.EnumWindows(windowProc, 0);
}
module.exports = hideWindow;
