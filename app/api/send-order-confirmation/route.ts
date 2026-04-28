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
          <tr>
            <td style="padding:22px 0;border-bottom:1px solid #EEEAE5;">
              <div style="font-size:16px;font-weight:500;color:#2F2F2F;letter-spacing:0.01em;">
                ${item.product}
              </div>

              <div style="margin-top:10px;font-size:13px;line-height:1.8;color:#6F6F6F;">
                <span style="color:#A0A0A0;">Size:</span> ${item.size}<br/>
                <span style="color:#A0A0A0;">Color:</span> ${item.color}<br/>
                <span style="color:#A0A0A0;">Quantity:</span> ${item.quantity}<br/>
                <span style="color:#A0A0A0;">Customization:</span> ${
                  item.campName || item.college || "N/A"
                }<br/>
                ${
                  item.logoName
                    ? `<span style="color:#A0A0A0;">Design:</span> ${item.logoName}<br/>`
                    : ""
                }
                ${
                  item.placement
                    ? `<span style="color:#A0A0A0;">Placement:</span> ${item.placement}<br/>`
                    : ""
                }
              </div>
            </td>

            <td style="padding:22px 0;border-bottom:1px solid #EEEAE5;text-align:right;vertical-align:top;font-size:15px;font-weight:500;color:#2F2F2F;">
              $${lineTotal.toFixed(2)}
            </td>
          </tr>
        `;
      })
      .join("");

    const html = `
      <div style="margin:0;padding:0;background:#F7F7F5;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#2F2F2F;">
        <div style="max-width:660px;margin:0 auto;padding:42px 18px;">

          <div style="background:#ffffff;border:1px solid #EAE6E1;border-radius:30px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.035);">

            <div style="background:#6F879E;height:32px;"></div>

            <div style="padding:42px 38px 34px;">

              <div style="text-align:center;">
                <img
                  src="https://justmadecustom.com/logo.png"
                  alt="Just Made Custom"
                  style="height:58px;max-width:260px;object-fit:contain;margin-bottom:22px;"
                />

                <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#9A9A9A;">
                  Custom Order Request
                </div>

                <h1 style="margin:14px 0 8px;font-size:30px;line-height:1.15;font-weight:400;color:#2F2F2F;">
                  Your order was received
                </h1>

                <p style="margin:0 auto;max-width:430px;font-size:14px;line-height:1.7;color:#6B6B6B;">
                  We’re reviewing your custom selections and will follow up shortly with confirmation, final pricing, and payment instructions.
                </p>
              </div>

              <div style="margin:32px 0;border-top:1px solid #EEEAE5;"></div>

              <div style="background:#F7F7F5;border-radius:22px;padding:20px 22px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="font-size:12px;color:#9A9A9A;text-transform:uppercase;letter-spacing:0.12em;padding-bottom:6px;">
                      Order #
                    </td>
                    <td style="font-size:12px;color:#9A9A9A;text-transform:uppercase;letter-spacing:0.12em;text-align:right;padding-bottom:6px;">
                      Email
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;font-weight:500;color:#2F2F2F;">
                      ${orderNumber}
                    </td>
                    <td style="font-size:15px;font-weight:500;color:#2F2F2F;text-align:right;">
                      ${email}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-top:34px;">
                <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#9A9A9A;margin-bottom:8px;">
                  Order Summary
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${itemsHtml}
                </table>
              </div>

              <div style="margin-top:26px;text-align:right;">
                <div style="font-size:13px;color:#8A8A8A;">Estimated Order Total</div>
                <div style="margin-top:4px;font-size:30px;font-weight:500;color:#2F2F2F;">
                  ${total}
                </div>
              </div>

              <div style="margin-top:34px;background:#F7F7F5;border-radius:22px;padding:22px;text-align:center;">
                <p style="margin:0;font-size:14px;line-height:1.8;color:#5F5F5F;">
                  Each piece is made custom. We’ll confirm your details before payment is finalized.
                </p>
              </div>

              <div style="margin-top:34px;text-align:center;">
                <a
                  href="https://justmadecustom.com"
                  style="display:inline-block;background:#5F7A94;color:#ffffff;text-decoration:none;border-radius:999px;padding:13px 26px;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;"
                >
                  Visit Just Made
                </a>
              </div>

              <p style="margin:30px 0 0;text-align:center;font-size:12px;line-height:1.6;color:#A0A0A0;">
                Just Made Custom<br/>
                Custom pieces for camp, college, and everyday wear.
              </p>

            </div>
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
