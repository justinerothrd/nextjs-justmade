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
  logoImage?: string;
  placement?: string;
  distressed?: boolean;
};

function getImageUrl(image?: string) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `https://justmadecustom.com${image}`;
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { email, orderNumber, submittedAt, total, cart } = await req.json();

    const itemsHtml = (cart || [])
      .map((item: OrderItem) => {
        const lineTotal =
          parseFloat(item.price.replace("$", "")) * item.quantity;

        const imageUrl = getImageUrl(item.image);
        const logoImageUrl = getImageUrl(item.logoImage);

        return `
          <tr>
            <td style="padding:18px 0;border-bottom:1px solid #EEEAE5;">
              <table width="100%" style="border-collapse:collapse;">
                <tr>
                  ${
                    imageUrl
                      ? `
                  <td width="90" style="padding-right:14px;vertical-align:top;">
                    <img
                      src="${imageUrl}"
                      alt="${item.product}"
                      width="80"
                      style="display:block;width:80px;height:80px;object-fit:contain;border-radius:14px;background:#F7F7F5;padding:6px;"
                    />
                  </td>
                  `
                      : ""
                  }

                  <td style="vertical-align:top;">
                    <div style="font-size:15px;font-weight:600;color:#2F2F2F;">
                      ${item.product}
                    </div>

                    <div style="margin-top:6px;font-size:13px;color:#6F6F6F;line-height:1.7;">
                      Size: ${item.size}<br/>
                      Color: ${item.color}<br/>
                      Quantity: ${item.quantity}<br/>

                      ${
                        item.logoName
                          ? `
                            <span>Design: ${item.logoName}</span>
                            ${
                              logoImageUrl
                                ? `
                                  <img
                                    src="${logoImageUrl}"
                                    alt="${item.logoName}"
                                    width="38"
                                    style="display:inline-block;width:38px;height:38px;object-fit:contain;vertical-align:middle;margin-left:8px;border-radius:8px;background:#F7F7F5;padding:4px;border:none;"
                                  />
                                `
                                : ""
                            }
                            <br/>
                          `
                          : ""
                      }

                      ${item.placement ? `Placement: ${item.placement}<br/>` : ""}
                      ${
                        item.distressed
                          ? `Finish: Distressed / Vintage<br/>`
                          : ""
                      }
                    </div>
                  </td>

                  <td style="text-align:right;font-size:15px;font-weight:600;vertical-align:top;white-space:nowrap;">
                    $${lineTotal.toFixed(2)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `;
      })
      .join("");

    const html = `
      <div style="background:#FBFBFA;padding:24px 14px;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:560px;margin:0 auto;">
          <div style="background:white;border-radius:20px;padding:28px 22px;">

            <div style="text-align:center;margin-bottom:14px;">
              <img 
                src="https://justmadecustom.com/logo.png" 
                alt="Just Made Custom"
                style="max-width:160px;height:auto;"
              />
            </div>

            <div style="text-align:center;margin:18px 0;">
              <div style="width:52px;height:52px;border:2px solid #6F879E;border-radius:50%;line-height:48px;margin:0 auto;color:#6F879E;font-size:26px;">
                ✓
              </div>
            </div>

            <h1 style="text-align:center;font-weight:400;font-size:26px;margin:0;color:#2F2F2F;">
              We received your order!
            </h1>

            <p style="text-align:center;margin:12px auto 0;max-width:380px;font-size:14px;line-height:1.6;color:#555;">
              We’re reviewing your custom selections and will follow up shortly with confirmation and payment instructions.
            </p>

            <div style="margin-top:26px;background:#F7F7F5;border-radius:16px;padding:16px;">
              <table width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="font-size:12px;color:#888;">Order #</td>
                  <td style="font-size:12px;color:#888;text-align:right;">Date</td>
                </tr>
                <tr>
                  <td style="font-size:15px;font-weight:600;color:#2F2F2F;">
                    ${orderNumber}
                  </td>
                  <td style="font-size:14px;text-align:right;color:#2F2F2F;">
                    ${submittedAt}
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-top:26px;">
              <div style="font-size:11px;letter-spacing:0.2em;color:#888;margin-bottom:6px;">
                ORDER SUMMARY
              </div>

              <table width="100%" style="border-collapse:collapse;">
                ${itemsHtml}
              </table>
            </div>

            <div style="text-align:right;margin-top:18px;">
              <div style="font-size:13px;color:#777;">Estimated Total</div>
              <div style="font-size:30px;margin-top:4px;color:#2F2F2F;">
                ${total}
              </div>
            </div>

            <div style="margin-top:22px;background:#F7F7F5;border-radius:16px;padding:14px;text-align:center;font-size:13px;line-height:1.6;color:#555;">
              Each piece is made custom. We’ll confirm details before payment.
            </div>

            <div style="margin-top:28px;text-align:center;">
              <h2 style="font-weight:400;font-size:20px;margin:0;color:#2F2F2F;">
                What happens next?
              </h2>

              <p style="margin-top:10px;font-size:14px;line-height:1.6;color:#666;">
                We’ll review your order and follow up with final pricing and next steps.
              </p>

              <a
                href="https://justmadecustom.com"
                style="display:inline-block;margin-top:16px;background:#5F7A94;color:white;padding:12px 18px;border-radius:999px;font-size:12px;text-decoration:none;"
              >
                Visit Just Made
              </a>
            </div>

            <div style="margin-top:28px;text-align:center;font-size:11px;color:#aaa;">
              Questions? Just reply to this email.
            </div>

          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Just Made Custom <orders@justmadecustom.com>",
      to: [email],
      bcc: ["YOUR-EMAIL@gmail.com"],
      subject: `We received your order • ${orderNumber}`,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Order email failed:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
