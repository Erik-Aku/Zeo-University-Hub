// Import CryptoJS for generating hash values
import CryptoJS from 'crypto-js';

// Function to generate a unique hash ID for colleges
export const generateHashId = (name, city, state) => {
	console.log('generateHashId has been hit!');
	// Combines college details and generates a hash value
	return CryptoJS.SHA256(`${name}-${city}-${state}`).toString(CryptoJS.enc.Hex);
};
