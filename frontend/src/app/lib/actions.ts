"use server";

const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "mail.your-server.de",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(formData: FormData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const question = formData.get("question");

  console.log(firstName, lastName, email, question);

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Nova poruka sa sajta Atelje Natasa Beljin</h2>
        <p><strong>Ime:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pitanje:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${question}</p>
    </div>
`;

  await transporter.sendMail(
    {
      from: "webmaster@ateljenatasabeljin.com",
      to: email,
      subject: "Pitanje sa sajta",
      text: `Ime: ${firstName} ${lastName}\nEmail: ${email}\nPitanje: ${question}`,
      html, // HTML body
    },
    (error: any, info: any) => {
      if (error) {
        return console.log("Error:", error);
      }
      console.log("Message sent: %s", info.messageId);
      console.dir(info);
    }
  );
}
