let chosenDevice = null;

document.getElementById('connectButton').addEventListener('click', () => {
    navigator.bluetooth.requestDevice({
        // Adjust filters and optionalServices according to your Bluetooth device
       acceptAllDevices: true
       ,optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'] // Replace with your service UUID
    })
    .then(device => {
        chosenDevice = device;
        return device.gatt.connect();
    })
    .then(server => {
        // Get your specific service
        return server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb'); // Replace with your service UUID
    })
    .then(service => {
        // Here you would get the specific characteristic to write to
         return service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb'); // Replace with your characteristic UUID
    })
    .then(characteristic => {
        // Save the characteristic globally to use it later for sending data
        window.characteristic = characteristic;
        document.getElementById('numberInput').disabled = false;
        document.getElementById('sendButton').disabled = false;
    })
    .catch(error => {
        console.log('Connection failed', error);
    });
});

document.getElementById('sendButton').addEventListener('click', () => {
    const numberToSend = parseInt(document.getElementById('numberInput').value);
    if (isNaN(numberToSend)) {
        alert('Please enter a valid number');
        return;
    }

    const data = new Uint8Array([numberToSend]);
    // Use the saved characteristic to send the data
    window.characteristic.writeValue(data)
        .then(() => {
            console.log(`Number ${numberToSend} sent`);
        })
        .catch(error => {
            console.log('Send failed', error);
        });
});
