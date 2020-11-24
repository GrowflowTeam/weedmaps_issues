export const weedmapsAccessToken =
  process.env.WEEDMAPS_ACCESS_TOKEN || "replace_with_a_valid_token";

export const orgID = process.env.WEEDMAPS_ORG_ID || "replace_with_an_org_id";

export const catalogID =
  process.env.WEEDMAPS_CATALOG_ID || "replace_with_a_catalog_id";

export const testIterations = 10;

export const defaultPageSize = 10;

export const totalNumberOfProductsExpected = 27;

export const totalNumberOfPages = Math.ceil(
  totalNumberOfProductsExpected / defaultPageSize
);
