import test from "node:test";
import assert from "node:assert/strict";
import { kpopProducts, kpopGroups } from "../kpop/catalog.js";
import { kpopVariants, selectedKpopVariants } from "../shop/kpop-import.mjs";

test("the shared K-pop source preserves six product types and seven groups", () => {
  assert.equal(kpopProducts.length, 6); assert.equal(Object.keys(kpopGroups).length, 7);
  assert.equal(kpopProducts.find(item => item.id === 4).images[1].endsWith("1.JPG"), true);
});
test("group and design variants have unique IDs, resolved image paths, and accurate fixed galleries", () => {
  const all = Object.keys(kpopGroups).flatMap(kpopVariants);
  assert.equal(all.length, 127);
  assert.equal(new Set(all.map(item => item.id)).size, all.length);
  assert.equal(all.some(item => item.product.image.includes("GROUP")), false);
  assert.equal(kpopVariants("ONEUS").some(item => item.productName === "Member Collage Style"), false);
  assert.equal(kpopVariants("IZNA").filter(item => item.productName === "Member Collage Style").length, 8);
  assert.equal(kpopVariants("UNKNOWN").length, 0);
});
test("unpriced products and placeholder retailer links never invent prices or checkout destinations", () => {
  const items = kpopVariants("ONEUS");
  const custom = items.find(item => item.id === "kpop-oneus-1-v1");
  const placeholder = items.find(item => item.id === "kpop-oneus-5-v1");
  const real = items.find(item => item.id === "kpop-oneus-6-v1");
  assert.equal(custom.product.price, "Price on request"); assert.equal(custom.canPublish, true);
  assert.equal(placeholder.canPublish, false); assert.equal(placeholder.product.link, "");
  assert.equal(real.canPublish, true); assert.match(real.product.link, /sunniejae/);
  assert.equal(selectedKpopVariants([custom.id, custom.id]).length, 1);
  assert.throws(() => selectedKpopVariants(["not-a-design"]));
});
