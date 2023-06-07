const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();

const User = require('../Model/Models');
const Controller = require('../Controller/Controller.js');

router.get('/', function(req, res) {
  res.json({
    status: 'API Works',
    message: 'Welcome to Job Page'
  });
});

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const { filename, mimetype, path } = req.file;
  const bucketName = process.env.bName;

  // Upload the file to S3 bucket
  const uploadParams = {
    Bucket: process.env.bName,
    Key: filename,
    Body: fs.createReadStream(path),
    ContentType: mimetype,
  };

  s3.upload(uploadParams, async (err, data) => {
    if (err) {
      // console.error(err);
      return res.status(500).json({ message: 'Failed to upload file' });
    }

    // Get the public URL of the file
    const urlParams = {
      Bucket: bucketName,
      Key: filename,
      Expires:604800,
    };

    s3.getSignedUrl('getObject', urlParams, async (err, url) => {
      if (err) {
        // console.error(err);
        return res.status(500).json({ message: 'Failed to get file URL' });
      }

      // Create a new user and save the URL
      const user = new User({
        userName: req.body.userName,
        email:req.body.email,
        ctc: req.body.ctc,
        mobile: req.body.mobile,
        file: url, // Store the URL in the resumeUrl field
        experience: req.body.experience,
      });

      try {
        const savedUser = await user.save();
        res.json({
          message: 'File uploaded successfully and URL stored in the database',
          // fileUrl: url,
          // user: savedUser,
        });
      } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: 'Failed to save user' });
      }
    });
  });
});
router.route('/get-all').get(Controller.index);
router.route('/:user_id').get(Controller.view).patch(Controller.update).put(Controller.update).delete(Controller.Delete);
router.route('/del-all').post(Controller.delall);

module.exports = router;


