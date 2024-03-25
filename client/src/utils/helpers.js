import CryptoJS from 'crypto-js';

export const generateHashId = (name, city, state) => {
	console.log('generateHashId has been hit!');
	return CryptoJS.SHA256(`${name}-${city}-${state}`).toString(CryptoJS.enc.Hex);
};
