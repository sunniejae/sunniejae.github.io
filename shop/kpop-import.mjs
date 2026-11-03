import { kpopProducts, kpopGroups } from "../kpop/catalog.js";

export const kpopGroupOptions = Object.entries(kpopGroups).map(([id, group]) => ({ id, name: group.name }));

export function kpopVariants(groupId) {
  const group = kpopGroups[groupId];
  if (!group) return [];
  return kpopProducts.flatMap(template => {
    // A fixed IZNA gallery is not a gallery for every other group.
    const images = template.images.filter(image => image.includes("/GROUP/") || image.includes(`/${groupId}/`));
    return images.map((image, index) => {
      const direct = template.type === "redbubble";
      const link = direct && template.redbubbleLink && !template.redbubbleLink.includes("YOUR-SHOP") ? template.redbubbleLink : "";
      return {
        id: `kpop-${groupId.toLowerCase()}-${template.id}-v${index + 1}`,
        groupId, productName: template.name, version: index + 1,
        sku: `KP-${groupId}-${template.id}-${index + 1}`,
        product: {
          title: `${group.name} — ${template.name} · V${index + 1}`,
          description: `${template.description}\nGroup: ${group.name}. Design version ${index + 1}.`,
          price: direct ? "See retailer" : "Price on request",
          image: image.replace("/GROUP/", `/${groupId}/`),
          type: direct ? "direct" : "exclusive", link, available: false
        },
        canPublish: !direct || !!link
      };
    });
  });
}

export function selectedKpopVariants(ids) {
  const all = new Map(kpopGroupOptions.flatMap(group => kpopVariants(group.id)).map(item => [item.id, item]));
  const unique = [...new Set(ids)];
  if (!unique.length) throw new Error("Select at least one K-pop design.");
  return unique.map(id => {
    const item = all.get(id);
    if (!item) throw new Error("An unknown K-pop design was selected. Refresh and try again.");
    return item;
  });
}
