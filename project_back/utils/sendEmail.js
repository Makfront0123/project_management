import { MailtrapTransport } from "mailtrap";

import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    await transport.sendMail({
      from: `"Mi App" <no-reply@miapp.com>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

/**
 * import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
    try {
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Mi App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });
    } catch (error) {
        console.error("Email send error:", error);
        throw error;
    }
};

export default sendEmail;



import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  try {
    await resend.emails.send({
      from: "Mariachi Show <reservas@mariachishowdelrecuerdomedellin.com>",
      to,
      subject,
      text,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Resend error:", error);
    throw error;
  }
};



 * 
 */