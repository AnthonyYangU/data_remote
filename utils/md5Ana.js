const crypto = require('crypto');



// m.update('test', 'utf8');

function md5Check(str, md5Data) {
    let result = md5Gene(str)
    // console.log('string is:', str)
    console.log('md5Check result:', result)
    if (result == md5Data) {
        return true;
    } else {
        return false;
    }
}

function md5Gene(str) {
    let m = crypto.createHash('md5');
    m.update(str, 'utf8');
    let result = m.digest('hex')
    // console.log(result.length)
    return result;
}


module.exports = {
    md5Check,
    md5Gene
}