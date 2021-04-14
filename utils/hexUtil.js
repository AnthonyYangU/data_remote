const Hexstring2btye = (str) => {
    let pos = 0;
    let len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    let hexA = new Array();
    for (let i = 0; i < len; i++) {
        let s = str.substr(pos, 2);
        let v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
}


const Bytes2HexString = (b) => {
    let hexs = "";
    for (let i = 0; i < b.length; i++) {
        let hex = b[i].toString(16);
        if (hex.length == 1) {
            hex = '0' + hex;
        }
        hexs += hex;
    }
    return hexs;
}

const HexString2Data = (str) => {
    let bytes = Hexstring2btye(str)
    let resultArray = []
    for (let i = 0; i < bytes.length; i++) {
        if (i % 2 != 0) {
            resultArray.push(bytes[i] + bytes[i - 1] * 256)
        }
    }
    return resultArray
}
// var tst = "ba36";

// var bt = Hexstring2btye(tst);
// console.log(bt);
// var st = Bytes2HexString(bt);
// console.log(st);

module.exports = {
    Hexstring2btye,
    Bytes2HexString,
    HexString2Data
}