import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// type CheckoutSesssionRequestBody = {
//   items: [],
//   email: string
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item: IProduct) => ({
    price_data: {
      currency: "INR",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
    description: item.description,
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1MI8glDuwdBSODIUDfxTlwSq"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: IProduct) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
