import { NextRequest, NextResponse } from "next/server";
import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

// SEcure a connection to FIREBASE from the backend.
const serviceAccount = require("../../serviceAccountKey.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to Stripe.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session: any) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("SUCCESS: Order " + session.id + " has been added to the DB");
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let stripeEvent;

    try {
      stripeEvent = stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.error("ERROR: ", err?.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    // Handle Checkout session completed event.
    if (stripeEvent.type === "checkout.session.completed") {
      console.log("fulfilling order");
      const session = stripeEvent.data.object;
      return fulfillOrder(session)
        .then(() => res.status(200).send("Successfully fulfilled order"))
        .catch((err) =>
          res.status(400).send(`Order fulfilling error: ${err.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolvers: true,
  },
};
