var net = require('net');
const testDataArray = require('./test.js')
// 指定连接的tcp server ip，端口
var options = {
    host: 'localhost',
    port: 9000
}

var tcp_client = net.Socket();
console.log(testDataArray)


// 连接 tcp server
tcp_client.connect(options, function () {

    // for (let i = 0; i < 5; i++) {
    //     console.log(testDataArray[i])
    //     tcp_client.write(testDataArray[i])
    // }
    tcp_client.write(testDataArray[0])
    // let i = 0;
    // function intervalFunc() {
    //     tcp_client.write(testDataArray[i]);
    //     i++
    //     if (i == 5) {
    //         i = 0
    //     }
    // }
    // console.log('connected to Server');

    // setInterval(intervalFunc, 1500);
})

// 接收数据
tcp_client.on('data', function (data) {
    console.log('received data: %s from server', data.toString());
})

tcp_client.on('end', function () {
    console.log('data end!');
})

tcp_client.on('error', function () {
    console.log('tcp_client error!');
})

