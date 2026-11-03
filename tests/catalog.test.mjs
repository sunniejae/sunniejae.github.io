import test from "node:test";
import assert from "node:assert/strict";
import { productShop, categoryPath, catalogMatches } from "../shop/catalog-model.mjs";

const categories = [
  { id: "art", name: "Art", parentId: "", shop: "studio-ken" },
  { id: "prints", name: "Prints", parentId: "art", shop: "studio-ken" },
  { id: "dark", name: "Dark collection", parentId: "prints", shop: "studio-ken" },
  { id: "gifts", name: "Gifts", parentId: "", shop: "sunnie-jae" }
];
const piece = { title: "Café Ghost", description: "Blue art print", shop: "studio-ken", categoryId: "dark" };
test("legacy products default to Sunnie Jae and do not leak into Studio Ken", () => {
  assert.equal(productShop({ title: "Legacy" }), "sunnie-jae");
  assert.equal(catalogMatches({ title: "Legacy" }, { shop: "studio-ken" }), false);
  assert.equal(catalogMatches(piece, { shop: "sunnie-jae" }), false);
});
test("category filters include descendants and combine with search", () => {
  assert.equal(catalogMatches(piece, { shop: "studio-ken", categoryId: "art", search: "cafe blue", categories }), true);
  assert.equal(catalogMatches(piece, { shop: "studio-ken", categoryId: "prints", search: "dark", categories }), true);
  assert.equal(catalogMatches(piece, { shop: "studio-ken", categoryId: "gifts", categories }), false);
  assert.deepEqual(categoryPath(categories, "dark", "studio-ken").map(item => item.id), ["art", "prints", "dark"]);
  assert.deepEqual(categoryPath(categories, "dark", "sunnie-jae"), []);
});
test("deep category paths avoid recursion and reject broken cycles", () => {
  const deep = Array.from({ length: 1500 }, (_, i) => ({ id: String(i), name: String(i), parentId: i ? String(i - 1) : "", shop: "studio-ken" }));
  assert.equal(categoryPath(deep, "1499", "studio-ken").length, 1500);
  assert.deepEqual(categoryPath([{ id: "x", parentId: "x", shop: "studio-ken" }], "x", "studio-ken"), []);
});
