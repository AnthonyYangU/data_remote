function getFormatDate() {
    var date = new Date();
    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var nowDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (nowDate >= 0 && nowDate <= 9) {
        nowDate = "0" + nowDate;
    }
    var newDate = year + seperator + month + seperator + nowDate;
    return newDate;
}
module.exports = getFormatDate