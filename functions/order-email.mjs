const states = { new: "Received", contacted: "In review", accepted: "Accepted", fulfilled: "Completed", cancelled: "Cancelled" };

export function orderEmail({ before, after, user, profile, enabled, requestId, shopURL }) {
  if (!enabled || !after || !user || user.disabled || !user.emailVerified || !user.email) return null;
  if (!profile?.orderEmailUpdates || profile.email?.toLowerCase() !== user.email.toLowerCase()) return null;
  if (before && before.status === after.status && (before.shopMessage || "") === (after.shopMessage || "")) return null;
  const status = Object.hasOwn(states, after.status) ? states[after.status] : null;
  if (!status) return null;
  const lines = [
    before ? "Your Sunnie Jae request has an update." : "Your Sunnie Jae request was received.",
    `Reference: ${requestId}`, `Status: ${status}`, "",
    ...(after.items || []).map(item => `${item.title} × ${item.quantity}`)
  ];
  if (after.shopMessage) lines.push("", "From the shop:", after.shopMessage);
  lines.push("", `Sign in and open My requests: ${shopURL}`, "This request is not a payment or stock reservation.",
    "For order updates, issues, and inquiries: shop@sunniejae.com (include your request reference).",
    "To stop order emails, sign in through the cart, turn off email updates, and save your preference.");
  return { to: [user.email], message: { subject: `Sunnie Jae request ${status.toLowerCase()} · ${requestId}`, text: lines.join("\n") } };
}
