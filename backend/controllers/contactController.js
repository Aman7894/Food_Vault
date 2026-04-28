const nodemailer = require('nodemailer');

// @desc    Send a contact form email
// @route   POST /api/v1/contact
// @access  Public
exports.sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
  }

  try {
    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // Mail options: send to the restaurant owner
    const mailOptions = {
      from: `"Food Meal Locker Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Food Meal Locker] ${subject || 'New Contact Form Submission'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #e11d48, #be123c); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🍽️ Food Meal Locker</h1>
            <p style="color: #fecdd3; margin: 8px 0 0 0;">New Contact Form Submission</p>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                <td style="padding: 10px 0; color: #6b7280;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 10px 0; color: #6b7280;"><a href="mailto:${email}" style="color: #e11d48;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Subject:</td>
                <td style="padding: 10px 0; color: #6b7280;">${subject || 'N/A'}</td>
              </tr>
            </table>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <p style="color: #6b7280; line-height: 1.6; background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #e11d48;">${message}</p>
          </div>
          <div style="background: #111827; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 13px;">This email was sent via the Food Meal Locker contact form.</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: `"Food Meal Locker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message, ${name}! 🍽️`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #e11d48, #be123c); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🍽️ Food Meal Locker</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #111827;">Hi ${name}, thanks for reaching out!</h2>
            <p style="color: #6b7280; line-height: 1.6;">We've received your message and will get back to you as soon as possible, usually within 24 hours.</p>
            <p style="color: #6b7280; line-height: 1.6;">In the meantime, feel free to browse our menu and discover amazing food from our vendors.</p>
            <p style="color: #9ca3af; margin-top: 30px; font-size: 13px;">— The Food Meal Locker Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    res.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email. Please check server email configuration.' });
  }
};
