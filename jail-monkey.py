import frida, sys

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

jscode = """
Java.perform(() => {
    const klass = Java.use("com.gantix.JailMonkey.JailMonkeyModule");
    const hashmap_klass = Java.use("java.util.HashMap");
    const false_obj = Java.use("java.lang.Boolean").FALSE.value;
    
    klass.getConstants.implementation = function () {
        console.log('hooking with Frida');
        var h = hashmap_klass.$new();
        h.put("isJailBroken", false_obj);
        h.put("hookDetected", false_obj);
        h.put("canMockLocation", false_obj);
        h.put("isOnExternalStorage", false_obj);
        h.put("AdbEnabled", false_obj);
        return h;
    };
});
"""

process = frida.get_usb_device().attach('gadget')
script = process.create_script(jscode)
script.on('message', on_message)
print('[*] Running Frida')
script.load()
sys.stdin.read()