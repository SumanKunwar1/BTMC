import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn('⚠️ Cloudinary credentials not found. Image uploads will be disabled.');
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  console.log('☁️ Cloudinary configured successfully');
}

export const uploadToCloudinary = async (file: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      reject(new Error('Cloudinary not configured'));
      return;
    }

    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: `btmc-foundation/${folder}`,
        quality: 'auto',
        fetch_format: 'auto'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Upload failed'));
        }
      }
    ).end(file);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary not configured');
  }

  await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;