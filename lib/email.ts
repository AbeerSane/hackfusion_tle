import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset OTP - SPIT HF",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Password Reset Request</h2>
          <p>You requested a password reset. Use the OTP below:</p>
          <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="color: #fbbf24; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 12px;">This OTP expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}
