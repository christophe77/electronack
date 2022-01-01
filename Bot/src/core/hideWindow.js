const ref = require('ref-napi');
const ffi = require('ffi-napi');

const voidPtr = ref.refType(ref.types.void);
const stringPtr = ref.refType(ref.types.CString);

const user32 = ffi.Library('user32.dll', {
    EnumWindows: ['bool', [voidPtr, 'int32']],
    GetWindowTextA: ['long', ['long', stringPtr, 'long']],
    ShowWindow: ['int', ['int', 'int']]
});

function hideWindow(windowName) {
    const windowProc = ffi.Callback('bool', ['long', 'int32'], (hwnd, lParam) => {
        const buf = new Buffer.alloc(255);
        const ret = user32.GetWindowTextA(hwnd, buf, 255);
        const name = ref.readCString(buf, 0);
        console.log(name, hwnd,windowName)
        if (name.includes(windowName)) {
           
            user32.ShowWindow(hwnd, 0);
        }
    });
    user32.EnumWindows(windowProc, 0);
}

module.exports = hideWindow