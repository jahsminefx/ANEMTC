const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const isConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo' && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_KEY !== '1234567890';

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

/**
 * Upload Image File Buffer or Local File to Cloudinary (or local uploads directory fallback)
 */
async function uploadImage(filePath, folder = 'aninta_wellness') {
  try {
    if (isConfigured) {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `aninta/${folder}`,
        resource_type: 'auto'
      });
      // Remove temp file if created
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } else {
      // Local fallback mode for development without Cloudinary credentials
      const uploadsDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filename = `${Date.now()}-${path.basename(filePath)}`;
      const destination = path.join(uploadsDir, filename);

      fs.copyFileSync(filePath, destination);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return {
        url: `/uploads/${filename}`,
        publicId: filename
      };
    }
  } catch (error) {
    console.error('Image Upload Error:', error);
    throw new Error(`Failed to process image upload: ${error.message}`);
  }
}

module.exports = {
  uploadImage,
  isCloudinaryConfigured: isConfigured
};
