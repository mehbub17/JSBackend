import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // file system helps in managing file system


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)
            return null;

        //uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        //file has been uploaded successfully
        console.log("file is uploaded successfully",response.url);

        return response

        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation gets failed
    }
}

export {uploadOnCloudinary}