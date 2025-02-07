const fs = require("fs");
const path = require("path");

// Corrected conversion function
function convertBase64ToImage(base64String, userId) {
	const regexPattern = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-+.]+);base([a-z],)?([^;]+)/gi;
	const match = regexPattern.exec(base64String);

	if (!match) return null;

	// Extract MIME type and encoded data
	const mimeType = match[1];
	
	let decodedImgStrWithoutMimeTypePrefix = match[3];

	// Remove any extra characters that might have been added during encoding process
	decodedImgStrWithoutMimeTypePrefix = decodedImgStrWithoutMimeTypePrefix.replace(/^.*?,/, "");

	try {
			// Decode base64 string into Buffer object using 'base64' as the correct encoding
			let buffer = Buffer.from(decodedImgStrWithoutMimeTypePrefix, 'base64');
			
			// Create directory for user images if it doesn't exist
			const userImagesDirPath = path.join(__dirname, '../data/imgs', String(userId));
			fs.mkdirSync(userImagesDirPath, { recursive: true });

			// Generate filename based on current timestamp and extension from MIME type (e.g., png)
			let extensionTypeMatchedIndexInRegexResultArrayForExtensionType= mimeType.split("/")[1];
			
			const filename=`${Date.now()}.${extensionTypeMatchedIndexInRegexResultArrayForExtensionType}`;
			
			 // Save the image file in the imgs directory under user ID folder 
			 fs.writeFileSync(path.join(userImagesDirPath,filename),buffer);

			 return `/api/imgs/${userId}/${filename}`;
	
	 } catch (error) {
			 console.error(error);
			 return null;
	 }
}


module.exports = convertBase64ToImage;