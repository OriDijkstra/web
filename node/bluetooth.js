let chosenDevice = null;

document.getElementById('connectButton').addEventListener('click', () => {
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'] // 수정된 서비스 UUID
    })
    .then(device => {
        chosenDevice = device;
        return device.gatt.connect();
    })
    .then(server => {
        return server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb'); // 수정된 서비스 UUID
    })
    .then(service => {
        return service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb'); // 수정된 특성 UUID
    })
    .then(characteristic => {
        window.characteristic = characteristic;
        document.getElementById('nInput').disabled = false;
        document.getElementById('mInput').disabled = false;
        document.getElementById('sendButton').disabled = false;
    })
    .catch(error => {
        console.log('Connection failed', error);
    });
});

document.getElementById('sendButton').addEventListener('click', () => {
    const nValue = parseInt(document.getElementById('nInput').value);
    const mValue = parseInt(document.getElementById('mInput').value);

    if (isNaN(nValue) || isNaN(mValue)) {
        alert('N과 M에 유효한 숫자를 입력하세요');
        return;
    }

    // N과 M을 하나의 배열로 결합하여 전송
    const data = new Uint8Array([nValue, mValue]);
    window.characteristic.writeValue(data)
        .then(() => {
            console.log(`N: ${nValue}, M: ${mValue} 전송됨`);
        })
        .catch(error => {
            console.log('전송 실패', error);
        });
});
