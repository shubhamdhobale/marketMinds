import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Support Team" <${process.env.EMAIL_USER}>`, 
            to, 
            subject, 
            html,
        });

        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Email could not be sent");
    }
};

export default sendEmail;
