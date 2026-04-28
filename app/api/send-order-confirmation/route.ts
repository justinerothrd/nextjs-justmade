import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, orderNumber, total } = await req.json();

    const { error } = await resend.emails.send({
      from: "Just Made Custom <onboarding@resend.dev>",
      to: [email],
      subject: `We received your order • ${orderNumber}`,
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>Just Made Custom</h2>
          <p>We received your order request!</p>
          <p><strong>Order #:</strong> ${orderNumber}</p>
          <p><strong>Total:</strong> ${total}</p>
          <p>We’ll follow up shortly with confirmation and payment details.</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
