const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

app.post('/resize_local', async (req, res) => {
  try {
    const { folderName } = req.query;

    // Create a directory if it doesn't exist
    const targetDir = path.join(__dirname, 'images', folderName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Get the uploaded files
    const files = Object.values(req.body.files);

    if (!Array.isArray(files)) {
      throw new Error('Expected an array of files.');
    }

    // Iterate over the uploaded files and upload each one to the target folder
    for (const file of files) {
      if (!file.file || !file.filename) {
        throw new Error('File object is missing required properties.');
      }

      // Check if the uploaded file is an image
      const isImage = ['image/png', 'image/jpeg', 'image/tiff'].includes(file.mimetype);

      if (isImage) {
        // Get the image dimensions
        const image = sharp(file._buf);
        const { width, height, metadata } = await image.metadata();

        if (width > 2048) {
          // Resize the image while retaining its original metadata
          const resizedImage = image.resize({
            width: 2048,
            height: Math.round(2048 * (height / width)),
            fit: 'inside',
            withoutEnlargement: true,
          }).withMetadata(metadata);

          // Save the resized image to the target folder
          const filePath = path.join(targetDir, file.filename);
          await resizedImage.toFile(filePath);
          console.log(`File ${file.filename} uploaded and resized successfully.`);
        } else {
          // Save the original image to the target folder
          const filePath = path.join(targetDir, file.filename);
          fs.writeFileSync(filePath, file._buf);
          console.log(`File ${file.filename} uploaded successfully.`);
        }
      } else {
        console.log(`File ${file.filename} is not an image and was not resized.`);
        // Save the non-image file to the target folder
        const filePath = path.join(targetDir, file.filename);
        fs.writeFileSync(filePath, file._buf);
      }
    }

    res.send({ message: 'File(s) uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file(s)', error);
    res.status(500).send({ message: 'Error uploading file(s)' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});