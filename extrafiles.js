// // const crypto = require('crypto');
// // const nodemailer = require('nodemailer');
// // const knex = require('knex'); // Your knex setup

// // const requestPasswordReset = async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     // Check if the user exists
// //     const user = await knex('users')
//         .where({ email })
//         .first();
// //     if (!user) {
// //       return res.status(404).json({ msg: "User with this email does not exist" });
// //     }

// //     // Generate OTP (6-digit)
// //     const otp = crypto.randomInt(100000, 999999);

// //     // Save the OTP and expiration (e.g., valid for 10 minutes)

// //     await knex('users')
// //       .where({ id: user.id })
// //       .update({ otp, otp_expiry: Date.now() + 10 * 60 * 1000 }); // 10 minutes expiration



// //     return res.status(200).json({ msg: 'OTP has been sent to your email' });

// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ msg: "Internal server error" });
// //   }
// // };



// // this is second step 


// const bcrypt = require('bcryptjs');

// const resetPasswordWithOTP = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     // Check if user exists and if OTP is valid
//     const user = await knex('users')
//       .where({ email })
//       .andWhere('otp', otp)
//       .first();

//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid OTP or email' });
//     }

//     // Check if OTP has expired
//     if (Date.now() > user.otp_expiry) {
//       return res.status(400).json({ msg: 'OTP has expired' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user password and clear OTP
//     await knex('users')
//       .where({ id: user.id })
//       .update({ password: hashedPassword, otp: null, otp_expiry: null });

//     return res.status(200).json({ msg: 'Password has been reset successfully' });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// };
