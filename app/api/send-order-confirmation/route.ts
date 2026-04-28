import { Resend } from "resend";

type OrderItem = {
  product: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
  image?: string;
  campName?: string;
  college?: string;
  logoName?: string;
  placement?: string;
};

function getImageUrl(image?: string) {
  if (!image) return "";

  if (image.startsWith("http")) return image;

  return `https://justmadecustom.com${image}`;
}

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
    const { email, orderNumber, submittedAt, total, cart } = await req.json();

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

        const imageUrl = getImageUrl(item.image);

        return `
          <tr>
            <td style="padding:18px 0;border-bottom:1px solid #EEEAE5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  ${
                    imageUrl
                      ? `
                    <td width="92" style="vertical-align:top;padding-right:16px;">
                      <img
                        src="${imageUrl}"
                        alt="${item.product}"
                        width="82"
                        style="display:block;width:82px;height:82px;object-fit:contain;border-radius:16px;background:#F7F7F5;padding:8px;border:1px solid #EEEAE5;"
                      />
                    </td>
                  `
                      : ""
                  }

                  <td style="vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                      <tr>
                        <td style="font-size:15px;font-weight:600;color:#2F2F2F;line-height:1.35;padding-bottom:6px;">
                          ${item.product}
                        </td>

                        <td style="font-size:15px;font-weight:600;color:#2F2F2F;text-align:right;vertical-align:top;white-space:nowrap;padding-left:10px;">
                          $${lineTotal.toFixed(2)}
                        </td>
                      </tr>
                    </table>

                    <div style="font-size:13px;line-height:1.75;color:#6F6F6F;">
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
                </tr>
              </table>
            </td>
          </tr>
        `;
      })
      .join("");

    const html = `
      <div style="margin:0;padding:0;background:#FBFBFA;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#2F2F2F;">
        <div style="max-width:560px;margin:0 auto;padding:24px 14px;">

          <div style="background:#ffffff;border:1px solid #EAE6E1;border-radius:22px;overflow:hidden;box-shadow:0 6px 22px rgba(0,0,0,0.035);">

            <div style="padding:34px 24px 28px;">

              <div style="text-align:center;">
                <div style="font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#2F2F2F;font-weight:600;">
                  Just Made Custom
                </div>

                <div style="margin:26px auto 18px;width:58px;height:58px;border:3px solid #6F879E;border-radius:50%;line-height:54px;text-align:center;color:#6F879E;font-size:30px;">
                  ✓
                </div>

                <h1 style="margin:0;font-size:28px;line-height:1.18;font-weight:400;color:#2F2F2F;">
                  We received your order!
                </h1>

                <p style="margin:14px auto 0;max-width:390px;font-size:15px;line-height:1.7;color:#555;">
                  Thanks for your custom order request. We’ll review your details and follow up shortly with confirmation and payment instructions.
                </p>
              </div>

              <div style="margin-top:28px;background:#F7F7F5;border-radius:18px;padding:18px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="font-size:11px;color:#8F8F8F;text-transform:uppercase;letter-spacing:0.18em;padding-bottom:7px;">
                      Order Number
                    </td>
                    <td style="font-size:11px;color:#8F8F8F;text-transform:uppercase;letter-spacing:0.18em;text-align:right;padding-bottom:7px;">
                      Order Date
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;font-weight:500;color:#2F2F2F;vertical-align:top;">
                      ${orderNumber}
                    </td>
                    <td style="font-size:14px;font-weight:500;color:#2F2F2F;text-align:right;vertical-align:top;line-height:1.4;">
                      ${submittedAt || "Submitted today"}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-top:28px;">
                <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#8F8F8F;margin-bottom:4px;">
                  Order Summary
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${itemsHtml}
                </table>
              </div>

              <div style="margin-top:22px;text-align:right;">
                <div style="font-size:14px;color:#777;">Estimated Order Total</div>
                <div style="margin-top:4px;font-size:34px;font-weight:400;color:#2F2F2F;">
                  ${total}
                </div>
              </div>

              <div style="margin-top:26px;background:#F7F7F5;border-radius:18px;padding:18px;text-align:center;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#5F5F5F;">
                  Each piece is made custom. We’ll confirm your details before payment is finalized.
                </p>
              </div>

              <div style="margin-top:28px;text-align:center;">
                <div style="margin:0 auto 14px;width:44px;height:44px;border-radius:50%;background:#EEF3F7;line-height:44px;text-align:center;color:#5F7A94;font-size:22px;">
                  ✉
                </div>

                <h2 style="margin:0;font-size:22px;font-weight:400;color:#2F2F2F;">
                  What happens next?
                </h2>

                <p style="margin:12px auto 0;max-width:390px;font-size:14px;line-height:1.7;color:#666;">
                  We’ll review your order and follow up with final pricing, payment details, and next steps.
                </p>

                <p style="margin:12px auto 0;max-width:390px;font-size:14px;line-height:1.7;color:#666;">
                  If you have any questions, just reply to this email.
                </p>

                <a
                  href="https://justmadecustom.com"
                  style="display:inline-block;margin-top:20px;background:#5F7A94;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 20px;font-size:12px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;"
                >
                  Visit Just Made
                </a>
              </div>

              <div style="margin-top:32px;padding-top:20px;border-top:1px solid #EEE;text-align:center;">
                <p style="margin:0;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#2F2F2F;font-weight:600;">
                  Just Made Custom
                </p>

                <p style="margin:8px 0 0;font-size:12px;line-height:1.6;color:#999;">
                  Custom apparel made for camp, college, and everyday wear.
                </p>

                <p style="margin:18px 0 0;font-size:11px;line-height:1.6;color:#B5B5B5;">
                  This email was sent because you placed an order request with Just Made Custom.<br/>
                  © 2026 Just Made Custom. All rights reserved.
                </p>
              </div>

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
