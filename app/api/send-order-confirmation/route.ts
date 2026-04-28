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
};

function getImageUrl(image?: string) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `https://justmadecustom.com${image}`;
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email,
