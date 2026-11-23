// Copies the listed fields from `source` (trimming strings), skipping undefined ones.
export const pick = (source = {}, fields) =>
  fields.reduce((acc, field) => {
    const value = source[field];
    if (value !== undefined) {
      acc[field] = typeof value === "string" ? value.trim() : value;
    }
    return acc;
  }, {});
