const CryptoJS = require('crypto-js');

const generateHashId = (name, city, state) => {
    return CryptoJS.SHA256(`${name}-${city}-${state}`).toString(CryptoJS.enc.Hex);
};

module.exports = {
    generateHashId
};