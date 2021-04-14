var net = require('net');
const testDataArray = require('./test.js')
// 指定连接的tcp server ip，端口
var options = {
    host: 'localhost',
    port: 9000
}

var tcp_client = net.Socket();
console.log(testDataArray)

var index = 0
// 连接 tcp server
tcp_client.connect(options, function () {

    setInterval(() => {
        tcp_client.write(testDataArray[index++])
        if (index == 5) {
            index = 0
        }
    }, 1000)
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

