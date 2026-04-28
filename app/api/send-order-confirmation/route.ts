import { Resend } from "resend";

type OrderItem = {
  product: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
  campName?: string;
  college?: string;
  logoName?: string;
  placement?: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { email, orderNumber, total, cart } = await req.json();

    if (!email || !orderNumber) {
      return Response.json(
        { error: "Missing email or order number" },
        { status: 400 }
      );
    }

    const itemsHtml = (cart || [])
      .map((item: OrderItem) => {
        const lineTotal =
          parseFloat(item.price.replace("$", "")) * item.quantity;

        return `
          <div style="padding:16px 0;border-bottom:1px solid #F0ECE8;">
            <div style="font-size:15px;font-weight:500;color:#2F2F2F;">
              ${item.product}
            </div>

            <div style="margin-top:6px;font-size:13px;color:#6B6B6B;line-height:1.7;">
              Size: ${item.size} · Color: ${item.color}<br/>
              Qty: ${item.quantity}<br/>
              ${
                item.campName || item.college
                  ? `Customization: ${item.campName || item.college}<br/>`
                  : ""
              }
              ${item.logoName ? `Design: ${item.logoName}<br/>` : ""}
              ${item.placement ? `Placement: ${item.placement}<br/>` : ""}
            </div>

            <div style="margin-top:8px;font-size:14px;font-weight:500;color:#2F2F2F;">
              $${lineTotal.toFixed(2)}
            </div>
          </div>
        `;
      })
      .join("");

    const html = `
      <div style="margin:0;padding:0;background:#F7F7F5;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#2F2F2F;">
        <div style="max-width:620px;margin:0 auto;padding:40px 20px;">
          <div style="background:#ffffff;border-radius:28px;border:1px solid #EAE6E1;padding:36px;">
            <div style="text-align:center;">
              <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8A8A8A;">
                Just Made Custom
              </div>

              <h1 style="margin:16px 0 6px;font-size:28px;font-weight:400;color:#2F2F2F;">
                Order Request Received
              </h1>

              <p style="margin:0;font-size:14px;color:#6B6B6B;">
                We’re reviewing your custom order
              </p>
            </div>

            <div style="margin:28px 0;border-top:1px solid #EAE6E1;"></div>

            <div style="font-size:14px;line-height:1.8;color:#555;">
              <div><strong style="color:#2F2F2F;">Order #</strong> ${orderNumber}</div>
              <div><strong style="color:#2F2F2F;">Email</strong> ${email}</div>
            </div>

            <div style="margin:28px 0;border-top:1px solid #EAE6E1;"></div>

            ${itemsHtml}

            <div style="margin-top:24px;text-align:right;">
              <div style="font-size:13px;color:#6B6B6B;">Order Total</div>
              <div style="font-size:24px;font-weight:600;margin-top:4px;color:#2F2F2F;">
                ${total}
              </div>
            </div>

            <div style="margin-top:28px;background:#F7F7F5;border-radius:18px;padding:18px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#555;">
                We’ll follow up shortly with confirmation, final pricing, and payment instructions.
              </p>
            </div>

            <p style="margin:30px 0 0;text-align:center;font-size:12px;color:#9A9A9A;">
              justmadecustom.com
            </p>
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Just Made Custom <orders@justmadecustom.com>",
      to: [email],
      subject: `We received your Just Made order • ${orderNumber}`,
      html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
