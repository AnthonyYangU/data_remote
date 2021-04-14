const { md5Check, md5Gene } = require('./md5Ana')
const { HexString2Data, Hexstring2btye } = require('./hexUtil')
const getFormatDate = require('./dateUtil')

function checkOnePackage(str) {
    let headId = str.substring(0, 4)
    let deviceId = str.substring(4, 8)
    console.log("headId is", headId)
    console.log("deviceId is", deviceId)
    let dataPackage = str.substring(8, 101 * 20 + 8);
    // console.log("dataPackage is", dataPackage)
    let md5Data = str.substring(2028, 2060)
    console.log("md5Data is", md5Data)
    return md5Check(dataPackage, md5Data)
}

function trans(dataPackage, headMessage) {
    // console.log(dataPackage)
    //所有数据的集合
    let dataArray = []

    for (let index = 0; index < dataPackage.length; index++) {
        if (index % 20 === 0) {
            let data = dataPackage.substring(index, index + 20)
            //2字节转化为10进制数
            let rowDataArray = HexString2Data(data)
            let rowData = {
                time: "",
                mcuVoltage: "",
                batteryVoltage: "",
                stress1: "",
                pressure1: "",
                pressure2: "",
                current: "",
                stress2: ""
            }
            rowData.time = headMessage.time
            rowData.mcuVoltage = headMessage.mcuVoltage
            rowData.batteryVoltage = headMessage.batteryVoltage
            rowData.stress1 = rowDataArray[0]
            rowData.pressure1 = rowDataArray[1]
            rowData.pressure2 = rowDataArray[2]
            rowData.current = rowDataArray[3]
            rowData.stress2 = rowDataArray[4]
            dataArray.push(rowData)
        }
    }

    return dataArray;
}

//解析单个csv文件的数据,strArray数组长度应为5
function transComplete(strArray) {

    //获取时间戳、mcu电压与电池电压
    let dateString = getFormatDate()
    let headMessage = {
        time: "",
        mcuVoltage: "",
        batteryVoltage: ""
    }
    //获取头数据
    let headDataArray = HexString2Data(strArray[0].substring(8, 28));
    // console.log(headDataArray)
    headMessage.time = dateString + " " + headDataArray[0] + ":" + headDataArray[1] + ":" + headDataArray[2]
    headMessage.mcuVoltage = headDataArray[3]
    headMessage.batteryVoltage = headDataArray[4]
    console.log("package head data", headMessage)
    //所有数据的集合
    let CompleteDataArray = []

    let dataPackage = ""
    for (let index = 0; index < strArray.length; index++) {
        if (index == 0) {
            dataPackage = strArray[index].substring(8 + 20, 2028);
        } else {
            dataPackage = strArray[index].substring(8, 2028)
        }
        console.log('index', index)

        let analyseDataArray = trans(dataPackage, headMessage)

        CompleteDataArray.push(...analyseDataArray)
    }
    console.log('CompleteDataArray', CompleteDataArray)
    return CompleteDataArray;
}


module.exports = {
    checkOnePackage,
    transComplete
}
