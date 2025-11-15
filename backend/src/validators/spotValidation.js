export function validateSpotPayload(body) {
  const errors = [];
  const { name, category, district, description, rating } = body ?? {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name obrigatório (mín. 2 caracteres)");
  }
  if (!category || typeof category !== "string" || category.trim().length < 2) {
    errors.push("category obrigatória (mín. 2 caracteres)");
  }
  if (district && typeof district !== "string") errors.push("district deve ser string");
  if (description && typeof description !== "string") errors.push("description deve ser string");
  if (rating !== undefined) {
    const r = Number(rating);
    if (Number.isNaN(r) || r < 0 || r > 5) errors.push("rating deve ser número entre 0 e 5");
  }
  return errors;
}
