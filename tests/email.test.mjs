import test from "node:test";
import assert from "node:assert/strict";
import { orderEmail } from "../functions/order-email.mjs";

const input = {
  before: null, after: { status: "new", email: "attacker-selected@example.com", items: [{ title: "Planner", quantity: 2 }] },
  user: { email: "verified@example.com", emailVerified: true, disabled: false },
  profile: { email: "verified@example.com", orderEmailUpdates: true },
  enabled: true, requestId: "request123", shopURL: "https://sunniejae.com/shop/home.html"
};
test("order receipts go only to the verified account address and contain the reference", () => {
  const job = orderEmail(input);
  assert.deepEqual(job.to, ["verified@example.com"]);
  assert.match(job.message.text, /request123/);
  assert.match(job.message.text, /Planner × 2/);
  assert.match(job.message.text, /shop@sunniejae.com/);
  assert.equal(Object.hasOwn(job.message, "html"), false);
});
test("email requires a configured sender, verified enabled account, and opt-in", () => {
  for (const changes of [
    { enabled: false }, { user: { ...input.user, emailVerified: false } }, { user: { ...input.user, disabled: true } },
    { profile: { ...input.profile, orderEmailUpdates: false } }, { profile: { ...input.profile, email: "someone-else@example.com" } }, { after: null }
  ]) assert.equal(orderEmail({ ...input, ...changes }), null);
});
test("only status or shop-message changes generate an update", () => {
  assert.equal(orderEmail({ ...input, before: { ...input.after } }), null);
  const changed = orderEmail({ ...input, before: input.after, after: { ...input.after, status: "accepted", shopMessage: "Your color is available." } });
  assert.match(changed.message.subject, /accepted/);
  assert.match(changed.message.text, /Your color is available/);
});
