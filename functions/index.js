import { createHash } from "node:crypto";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { defineString } from "firebase-functions/params";
import { orderEmail } from "./order-email.mjs";

initializeApp();
const db = getFirestore();
const shopURL = defineString("SHOP_URL", { default: "https://sunniejae.com/shop/home.html" });

// Install Firebase's Trigger Email extension against the private `mail` collection.
// This function queues messages; SMTP credentials belong to the extension, never clients.
export const queueOrderEmail = onDocumentWritten({ document: "saleRequests/{requestId}", retry: true }, async event => {
  if (!event.data?.after.exists) return;
  const after = event.data.after.data();
  const before = event.data.before.exists ? event.data.before.data() : null;
  if (before && before.status === after.status && (before.shopMessage || "") === (after.shopMessage || "")) return;
  const settings = await db.doc("shopSettings/notifications").get();
  if (settings.data()?.emailUpdatesEnabled !== true) return;
  if (typeof after.customerId !== "string" || !after.customerId) return;
  const profile = await db.doc(`customers/${after.customerId}`).get();
  if (profile.data()?.orderEmailUpdates !== true) return;
  let user;
  try { user = await getAuth().getUser(after.customerId); }
  catch (error) { if (error.code === "auth/user-not-found") return; throw error; }
  const job = orderEmail({ before, after, user, profile: profile.data(), enabled: true, requestId: event.params.requestId, shopURL: shopURL.value() });
  if (!job) return;
  const id = createHash("sha256").update(event.id).digest("hex");
  try { await db.doc(`mail/order-${id}`).create(job); }
  catch (error) { if (error.code !== 6 && error.code !== "already-exists") throw error; }
});
