const { Bytes2HexString, HexString2Data, Hexstring2btye } = require('./utils/hexUtil')
const { md5Check, md5Gene } = require('./utils/md5Ana')
const { checkOnePackage, transComplete } = require('./utils/dataTrans')
// const {}
let headData = "5a5b0001"
let tileData = "6162"

let headArray = Hexstring2btye("00170015002200300030")

let headString = Bytes2HexString(headArray)


//测试数据生成
let testDataArray = []
let testData = ""
for (let i = 0; i < 5; i++) {

    if (i == 0) {
        testData = headData + headString + dataPackage(100) + md5Gene(headString + dataPackage(100)) + tileData

    } else {
        testData = headData + dataPackage(101) + md5Gene(dataPackage(101)) + tileData
    }

    testDataArray.push(testData)
}

function dataPackage(num) {
    let dataPackageArray = [11, 12, 12, 14, 24, 21, 22, 12, 14, 15]
    let hexString = Bytes2HexString(dataPackageArray)
    let result = ""
    for (let i = 0; i < num; i++) {
        result = result + hexString
    }
    return result
}

// console.log("origin data length is", (headString + dataPackage(100)).length)

// console.log(checkOnePackage(testDataArray[0]))

// console.log(transComplete(testDataArray))

module.exports = testDataArray