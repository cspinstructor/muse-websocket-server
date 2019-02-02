const baUtil = require('byte-array-util');
const hex2ascii = require('hex2ascii');

let prevData, prevEeg;

//debug
getEegASCII = msg => {
  msg = baUtil.toHexString(msg);
  ascii = hex2ascii(msg);

  if (ascii.indexOf('/eeg') >= 0) {
    prevEeg = msg;
    return msg;
  } else {
    return prevEeg;
  }
};

getRaw = msg => {
  msg = baUtil.toHexString(msg);
  ascii = hex2ascii(msg);

  if (ascii.indexOf('/eeg') >= 0) {
    prevEeg = ascii;
    return ascii;
  } else {
    return prevEeg;
  }
};

getEegStream = msg => {
  msg = baUtil.toHexString(msg);
  ascii = hex2ascii(msg);

  if (ascii.indexOf('/eeg') >= 0) {
    prevEeg = msg;
    return msg;
  } else {
    return prevEeg;
  }
};

extractEegData = (msg, offset) => {
  let eegStream = getEegStream(msg);
  if (eegStream) {
    let num = eegStream.substring(offset, eegStream.length);
    return num;
  }
};

extractEegData = (msg, offset) => {
  let eegStream = getEegStream(msg);
  if (eegStream) {
    let num = eegStream.substring(40, eegStream.length);
    let b = num.substr(offset, 16);
    let t = Buffer(b, 'hex').readDoubleBE(0);

    if (t !== undefined) {
      return t.toFixed(1);
    }
  }
};

getEeg0 = msg => {
  return extractEegData(msg, 0);
};

getEeg1 = msg => {
  return extractEegData(msg, 16);
};

getEeg2 = msg => {
  return extractEegData(msg, 32);
};

getEeg3 = msg => {
  return extractEegData(msg, 48);
};

module.exports = {
  getEeg0,
  getEeg1,
  getEeg2,
  getEeg3,
  getEegStream,
  extractEegData,
  getEegASCII
};
