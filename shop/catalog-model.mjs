export const shopOptions = [{ id: "sunnie-jae", name: "Sunnie Jae" }, { id: "studio-ken", name: "Studio Ken" }];
export function productShop(product) { return product.shop === "studio-ken" ? "studio-ken" : "sunnie-jae"; }
export function categoryPath(categories, id, shop) {
  const byId = new Map(categories.filter(item => item.shop === shop).map(item => [item.id, item]));
  const seen = new Set(); const path = [];
  while (id) {
    if (seen.has(id) || !byId.has(id)) return [];
    seen.add(id); const item = byId.get(id); path.push(item); id = item.parentId;
  }
  return path.reverse();
}
function normalized(text) { return String(text || "").normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase(); }
export function catalogMatches(product, { shop, categoryId = "", search = "", categories = [] }) {
  if (productShop(product) !== shop) return false;
  const path = categoryPath(categories, product.categoryId, shop);
  if (categoryId && !path.some(item => item.id === categoryId)) return false;
  const text = normalized([product.title, product.description, ...path.map(item => item.name)].join(" "));
  return normalized(search).trim().split(/\s+/).filter(Boolean).every(word => text.includes(word));
}
