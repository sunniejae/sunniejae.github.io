// Pure inventory calculations shared by the admin client and tests.
export const MAX_QUANTITY = 1_000_000_000;

export function quantity(value, label = "Quantity", integer = false) {
  if (value === "" || value == null) throw new Error(`${label} is required.`);
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > MAX_QUANTITY || (integer && !Number.isInteger(number))) {
    throw new Error(`${label} must be ${integer ? "a whole number" : "a number"} between 0 and ${MAX_QUANTITY}.`);
  }
  return number;
}

export function adjustedStock(current, delta, integer = false) {
  if (delta === "" || delta == null || !Number.isFinite(Number(delta)) || Number(delta) === 0) {
    throw new Error("Enter a nonzero stock change.");
  }
  return quantity(Math.round((quantity(current) + Number(delta)) * 1e6) / 1e6, "Resulting stock", integer);
}

export function parseRecipe(text) {
  const recipe = {};
  for (const line of text.split("\n").map(line => line.trim()).filter(Boolean)) {
    const [id, amount, extra] = line.split("=").map(value => value.trim());
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(id) || ["__proto__", "constructor", "prototype"].includes(id) || extra !== undefined || Object.hasOwn(recipe, id)) {
      throw new Error("Use one unique supply ID = amount per line.");
    }
    const units = quantity(amount, "Supply amount");
    if (units <= 0 || units > 1_000_000) throw new Error("Each supply amount must be greater than zero and at most 1,000,000.");
    recipe[id] = units;
  }
  if (Object.keys(recipe).length > 20) throw new Error("A recipe can contain at most 20 supplies.");
  return recipe;
}

export function planProduction(inventory, supplies, count) {
  const units = quantity(count, "Batch size", true);
  if (units < 1 || units > 10_000) throw new Error("Make between 1 and 10,000 products at a time.");
  const entries = Object.entries(inventory.recipe || {});
  if (!entries.length) throw new Error("Save a supply recipe for this product first.");
  const remaining = {};
  for (const [id, amount] of entries) {
    const supply = supplies[id];
    if (!supply || supply.active === false) throw new Error(`Supply ${id} is missing or archived.`);
    const required = quantity(amount, "Recipe amount") * units;
    if (required <= 0) throw new Error(`Invalid recipe amount for ${id}.`);
    if (supply.quantity < required - 1e-7) throw new Error(`Not enough ${supply.name || id} for this batch.`);
    remaining[id] = adjustedStock(supply.quantity, -required);
  }
  return { stock: adjustedStock(inventory.stock || 0, units, true), remaining };
}
