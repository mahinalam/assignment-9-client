"use server";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Message from Electromert!",
    // text: message,
    html: ` <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #E21B70;">Welcome to <span style="color: #000;">Electromert</span>!</h2>
      <p>Hi,</p>
      <p>Thanks for subscribing to our newsletter! 🎉</p>
      <p>Get ready for the best deals and latest updates on outdoor and camping gear.</p>
      <p style="margin-top: 20px;">Happy exploring,<br/>The Electromert Team</p>
    </div>`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();

    return NextResponse.json({ message: "Email sent", status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
