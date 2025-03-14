
    function crc16changgong(data) {
        let crc = 0x1017;
        for (let i = 0; i < data.length; i++) {
            crc ^= data.charCodeAt(i);
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x0001) == 1) {
                    crc >>= 1;
                    crc ^= 0xA001;
                } else crc >>= 1;
            }
        }
        return crc;
    }

    function makePayload(deviceName) {
        const checksum = crc16changgong(deviceName.slice(-5));
        // prettier-ignore
        return new Uint8Array([
            0xFE, 0xFE, 0x09, 0xB2,
            0x01, checksum & 0xFF, checksum >> 8, 0x00,
            0x70, 0xE2, 0xEB, 0x20,
            0x01, 0x01, 0x00, 0x00,
            0x00, 0x6C, 0x30, 0x00
        ]);
    }

    let bluetoothDevice;
    let characteristic;
    let isStarted = false;

    function updateUi(stage) {
        const mainButton = document.getElementById("main-button");
        const deviceName = document.getElementById("device-name");
        const status = document.getElementById("status");
        switch (stage) {
            case "pending":
                mainButton.innerText = "请稍后";
                mainButton.disabled = true;
                deviceName.innerText = "已连接：" + bluetoothDevice.name;
                break;
            case "ok":
                mainButton.innerText = "结束";
                mainButton.disabled = false;
                break;
            case "standby":
                mainButton.innerText = "开启";
                mainButton.disabled = false;
                deviceName.innerText = "未连接";
                break;
        }
    }

    async function handleBluetoothError(error) {
        // this is so fucking ugly but i have no choice
        // you would never know how those shitty browsers behave
        if (error.toString().match(/User cancelled/) || error.toString() == "2") return; // "2" is a weird behavior of Bluefy browser on iOS
        const dialogContent = document.getElementById("dialog-content");
        if (error.toString().match(/User denied the browser permission/)) {
            dialogContent.innerText = "蓝牙权限遭拒。\n\n请前往手机设置，授予浏览器“位置信息”权限。\n此权限不会用于定位，详情请参考源代码仓库内的";

        } else if (error.toString().match(/NetworkError/)) {
            dialogContent.innerText = "连接不稳定，无法与水控器建立连接。\n请重试。";
        } else if (!navigator.bluetooth || error.toString().match(/Bluetooth adapter not available/) || error.toString().match(/NotFoundError/)) {
            dialogContent.innerText = "找不到蓝牙硬件，或浏览器不支持。";

        } else {
            dialogContent.innerText = error + "\n\n是什么呢\n\n（这可能是一个Bug，请截图并";

        }
        document.getElementById("dialog").showModal();
        if (bluetoothDevice) await bluetoothDevice.gatt.disconnect();
        isStarted = false;
        updateUi("standby");
    }

    async function start() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: "Water" }],
            optionalServices: [window.navigator.userAgent.match(/Bluefy/) ? "generic_access" : 0xF1F0] // workaround for Bluefy
        });
        updateUi("pending");
        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService(0xF1F0);
        characteristic = await service.getCharacteristic(0xF1F1);
        await characteristic.writeValue(makePayload(bluetoothDevice.name));
        isStarted = true;
        updateUi("ok");

        // 创建Web Worker
        const worker = new Worker('timerWorker.js');
        worker.postMessage({action: 'start', duration: 20 * 60 * 1000});
        
        worker.onmessage = function(e) {
            if (e.data === 'timeout' && isStarted) {
                end();
            }
        };
    } catch (error) {
        handleBluetoothError(error);
    }
}

    async function end() {
        try {
            const endPayload = new Uint8Array([0xFE, 0xFE, 0x09, 0xB3, 0x00, 0x00])
            await characteristic.writeValue(endPayload)
            await bluetoothDevice.gatt.disconnect();
            isStarted = false;
            updateUi("standby");
            // 重新加载网页
            window.location.reload(); 
        } catch (error) {
            handleBluetoothError(error);
        }
    }

    function handleButtonClick() {
        isStarted ? end() : start();
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/waterctl/visits");
    xhr.responseType = "json";
    xhr.send();

   



    // auto resize for desktop
    window.resizeTo(538, 334);
