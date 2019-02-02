const baUtil = require('byte-array-util');
const hex2ascii = require('hex2ascii');

let prevData, prevGyro;

//debug
getGyroASCII = msg => {
  msg = baUtil.toHexString(msg);
  ascii = hex2ascii(msg);

  if (ascii.indexOf('gyro') >= 0) {
    prevGyro = msg;
    return msg;
  } else {
    return prevGyro;
  }
};

getGyroStream = msg => {
  msg = baUtil.toHexString(msg);
  ascii = hex2ascii(msg);

  if (ascii.indexOf('gyro') >= 0) {
    prevGyro = msg;
    return msg;
  } else {
    return prevGyro;
  }
};

extractGyroData = (msg, offset) => {
  let gyroStream = getGyroStream(msg);
  if (gyroStream) {
    let num = gyroStream.substring(40, gyroStream.length);
    let b = num.substr(offset, 16);
    let t = Buffer(b, 'hex').readDoubleBE(0);

    if (t !== undefined) {
      return t.toFixed(1);
    }
  }
};

getZ = msg => {
  return extractGyroData(msg, 0);
};

getX = msg => {
  return extractGyroData(msg, 16);
};

getY = msg => {
  return extractGyroData(msg, 32);
};

module.exports = {
  getZ: getZ,
  getX: getX,
  getY: getY,
  getGyroASCII
};
