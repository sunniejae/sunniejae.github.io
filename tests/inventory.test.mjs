import test from "node:test";
import assert from "node:assert/strict";
import { quantity, adjustedStock, parseRecipe, planProduction } from "../shop/inventory-model.mjs";

test("adjustments enforce finite, nonnegative stock and whole products", () => {
  assert.equal(adjustedStock(5, -2, true), 3);
  assert.equal(adjustedStock(0.3, -0.2), 0.1);
  for (const change of [-6, Infinity, NaN, "", 0]) assert.throws(() => adjustedStock(5, change));
  assert.throws(() => adjustedStock(5, 0.5, true));
  assert.throws(() => quantity(""));
  assert.throws(() => quantity(1_000_000_001));
});

test("recipes reject malformed, duplicate, excessive, and unsafe entries", () => {
  assert.deepEqual(parseRecipe("paper = 2\nink = 0.5"), { paper: 2, ink: 0.5 });
  assert.deepEqual(parseRecipe(""), {});
  for (const input of ["paper", "paper = 0", "paper = -1", "paper = NaN", "paper = 1 = 2", "paper = 1\npaper = 2", "__proto__ = 1", "bad/id = 1"]) assert.throws(() => parseRecipe(input));
  assert.throws(() => parseRecipe(Array.from({ length: 21 }, (_, i) => `s${i} = 1`).join("\n")));
});

test("production calculates supply consumption without mutating its inputs", () => {
  const inventory = { stock: 3, recipe: { paper: 2, ribbon: 0.5 } };
  const supplies = { paper: { quantity: 10, active: true }, ribbon: { quantity: 2, active: true } };
  assert.deepEqual(planProduction(inventory, supplies, 4), { stock: 7, remaining: { paper: 2, ribbon: 0 } });
  assert.equal(inventory.stock, 3);
  assert.equal(supplies.paper.quantity, 10);
});

test("production rejects shortages, archived or missing supplies, and invalid batches", () => {
  const inventory = { stock: 0, recipe: { paper: 2 } };
  for (const supply of [undefined, { quantity: 1 }, { quantity: 10, active: false }]) assert.throws(() => planProduction(inventory, { paper: supply }, 1));
  for (const count of [0, -1, 1.5, 10001, NaN]) assert.throws(() => planProduction(inventory, { paper: { quantity: 100 } }, count));
  assert.throws(() => planProduction({ stock: 0, recipe: {} }, {}, 1));
  assert.throws(() => planProduction({ stock: 1_000_000_000, recipe: { paper: 1 } }, { paper: { quantity: 10 } }, 1));
});

test("a second batch uses updated supply balances and cannot consume stock twice", () => {
  const inventory = { stock: 0, recipe: { paper: 2 } };
  const supplies = { paper: { quantity: 3 } };
  const first = planProduction(inventory, supplies, 1);
  assert.throws(() => planProduction({ ...inventory, stock: first.stock }, { paper: { quantity: first.remaining.paper } }, 1));
});
