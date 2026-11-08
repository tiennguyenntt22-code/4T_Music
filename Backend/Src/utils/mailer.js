import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// Hàm gửi mail.
export const sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"4TMusic" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};
