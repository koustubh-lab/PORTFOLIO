import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, text, name, email } = req.body;

    const message = `
        You have received a new message from your portfolio contact form.

        --------------------------------------------------
        Name:   ${name}
        Email:  ${email}
        --------------------------------------------------

        Message:
        ${text}

        --------------------------------------------------
        Sent via Portfolio Website
      `;

    // ✅ HTML version (better formatting)
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2>📩 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${text}</p>
        <br />
        <p style="font-size: 0.9em; color: #888;">Sent via Portfolio Website</p>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Dev <onboarding@resend.dev>",
      to,
      subject,
      text: message,
      html: htmlMessage,
      replyTo: email,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
