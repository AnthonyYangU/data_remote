const net = require('net');
const TCP_PORT = "9000"
const TIMEOUT = 60000;//tcp客户端超过60秒没发数据判为超时并断开连接
const { checkOnePackage, transComplete } = require('./utils/dataTrans')
// const translate = require('./trans.js');
// const { createData } = require('./mongodb.js');
// var tcpClient = null;//tcp客户端

const tcpServer = net.createServer((socket) => {
    socket.receiveNumber = 0;
    socket.receivedDataArray = []
    //connect
    let addr = socket.address().address + ':' + socket.address().port;

    console.log(addr, " connect.");

    socket.addr = addr;

    socket.on("data", data => {
        let rd = data.toString('Hex');
        let str = addr + " receive: " + rd + '\n';
        console.log(str);
        //console.log("Ascii data:",data.toString("Ascii"));
        let headId = rd.substring(0, 4);
        console.log(socket.receiveNumber)

        socket.write("received");
        socket.receivedDataArray.push();
        socket.receiveNumber++;

        if (socket.receiveNumber == 5) {
            transComplete(socket.receivedDataArray)
            socket.receiveNumber = 0;
            socket.receivedDataArray = []
            socket.write("succeed");
        }

        // if (checkOnePackage(rd)) {
        //     socket.write("md5 succeed");
        //     console.log("md5 succeed")
        //     socket.receivedDataArray.push();
        //     socket.receiveNumber++;
        //     if (receiveNumber == 5) {
        //         transComplete(socket.receivedDataArray)
        //         receiveNumber = 0;
        //         socket.receivedDataArray = []
        //         socket.write("One package received");
        //     }
        // } else {
        //     socket.write("md5 fail");
        // }

    });

    // close
    socket.on('close', () => {
        console.log(addr, "close");
    });

    socket.on('error', (err) => {
        console.log("error", err);
    });

    socket.setTimeout(TIMEOUT);
    // 超过一定时间 没接收到数据，就主动断开连接。
    socket.on('timeout', () => {
        console.log(socket.addr, 'socket timeout');
        console.log('receiveNumber is', socket.receiveNumber);
        socket.end();
    });
});

tcpServer.on("error", (err) => {
    console.log(err);
});

tcpServer.listen({ port: TCP_PORT, host: '0.0.0.0' }, () => {
    console.log('tcp server running on', tcpServer.address())
});

module.exports = tcpServer;
