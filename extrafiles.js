// // // const crypto = require('crypto');
// // // const nodemailer = require('nodemailer');
// // // const knex = require('knex'); // Your knex setup

// // // const requestPasswordReset = async (req, res) => {
// // //   try {
// // //     const { email } = req.body;

// // //     // Check if the user exists
// // //     const user = await knex('users')
// //         .where({ email })
// //         .first();
// // //     if (!user) {
// // //       return res.status(404).json({ msg: "User with this email does not exist" });
// // //     }

// // //     // Generate OTP (6-digit)
// // //     const otp = crypto.randomInt(100000, 999999);

// // //     // Save the OTP and expiration (e.g., valid for 10 minutes)

// // //     await knex('users')
// // //       .where({ id: user.id })
// // //       .update({ otp, otp_expiry: Date.now() + 10 * 60 * 1000 }); // 10 minutes expiration



// // //     return res.status(200).json({ msg: 'OTP has been sent to your email' });

// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ msg: "Internal server error" });
// // //   }
// // // };



// // // this is second step 


// // const bcrypt = require('bcryptjs');

// // const resetPasswordWithOTP = async (req, res) => {
// //   try {
// //     const { email, otp, newPassword } = req.body;

// //     // Check if user exists and if OTP is valid
// //     const user = await knex('users')
// //       .where({ email })
// //       .andWhere('otp', otp)
// //       .first();

// //     if (!user) {
// //       return res.status(400).json({ msg: 'Invalid OTP or email' });
// //     }

// //     // Check if OTP has expired
// //     if (Date.now() > user.otp_expiry) {
// //       return res.status(400).json({ msg: 'OTP has expired' });
// //     }

// //     // Hash the new password
// //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// //     // Update user password and clear OTP
// //     await knex('users')
// //       .where({ id: user.id })
// //       .update({ password: hashedPassword, otp: null, otp_expiry: null });

// //     return res.status(200).json({ msg: 'Password has been reset successfully' });

// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ msg: "Internal server error" });
// //   }
// // };


// const express = require('express');
// const knex = require('./knex'); // Assume knex is configured
// const cloudinary = require('./cloudinaryConfig');
// const upload = require('./multerConfig');

// const app = express();

// app.post('/upload', upload.single('image'), async (req, res) => {
//   const { user_id } = req.body; // assuming user_id is sent in the request body

//   if (!req.file) {
//     return res.status(400).json({ message: 'No image file uploaded' });
//   }

//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (err, uploadResult) => {
//       if (err) {
//         return res.status(500).json({ message: 'Cloudinary upload failed' });
//       }

//       // Save image URL to the database
//       await knex('user_images').insert({
//         user_id,
//         image_url: uploadResult.secure_url,
//         created_at: knex.fn.now(),
//         updated_at: knex.fn.now(),
//       });

//       res.status(200).json({
//         message: 'Image uploaded successfully',
//         imageUrl: uploadResult.secure_url,
//       });
//     });

//     // Pipe the file stream to Cloudinary
//     req.file.stream.pipe(result);
//   } catch (err) {
//     res.status(500).json({ message: 'Error uploading image', error: err.message });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
